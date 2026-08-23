-- 이지크레더블 상담 신청 저장소 (Neon Postgres)
-- Neon 콘솔의 SQL Editor에 그대로 붙여넣어 실행한다.
-- 여러 번 실행해도 안전하고, 예전 버전을 이미 실행한 프로젝트에도 그대로 적용된다.

create table if not exists consultations (
  id            bigint generated always as identity primary key,

  -- 신청 내용 (src/lib/consultation.ts의 normalizeConsultation 결과와 1:1)
  topic         text        not null,
  topic_label   text        not null,  -- 신청 시점의 한글 라벨. 메뉴명이 바뀌어도 당시 값을 보존한다
  name          text        not null,
  position      text        not null,
  phone         text        not null,
  company       text        not null,
  biz_no        text        not null,
  message       text        not null default '',

  -- 처리 상태 (관리자 페이지에서 변경). 허용 값은 아래 제약에서 관리한다
  status        text        not null default 'new',

  -- 알림 메일 결과. 저장은 됐는데 메일이 실패한 건을 관리자 페이지에서 찾을 수 있게 남긴다
  notified_at   timestamptz,
  notify_error  text,

  -- 메타. 원본 IP는 저장하지 않는다 — 재신청 남용 차단에 필요한 만큼만 HMAC 해시로 보관
  ip_hash       text,
  user_agent    text,
  submitted_at  timestamptz not null,
  created_at    timestamptz not null default now()
);

-- 상담 경과 메모. 덮어쓰지 않고 적을 때마다 한 줄씩 쌓인다
create table if not exists consultation_notes (
  id              bigint      generated always as identity primary key,
  consultation_id bigint      not null references consultations (id) on delete cascade,
  body            text        not null,
  created_at      timestamptz not null default now()
);

-- 상태 값은 매번 다시 정의한다. 예전 값(contacted/done)이 남아 있으면 새 값으로 옮긴 뒤 제약을 건다.
alter table consultations drop constraint if exists consultations_status_check;
update consultations set status = 'in_progress' where status = 'contacted';
update consultations set status = 'won'         where status = 'done';
alter table consultations add constraint consultations_status_check
  check (status in ('new', 'in_progress', 'won', 'lost', 'spam'));

-- 예전 버전의 memo 컬럼이 남아 있으면 내용을 메모 로그의 첫 항목으로 옮기고 컬럼을 없앤다
do $$
begin
  if exists (
    select 1 from information_schema.columns
     where table_name = 'consultations' and column_name = 'memo'
  ) then
    insert into consultation_notes (consultation_id, body, created_at)
      select id, memo, created_at from consultations where memo <> '';
    alter table consultations drop column memo;
  end if;
end $$;

-- 관리자 로그인 접속기록. 두 가지 목적을 겸한다:
--   1) 로그인 남용 차단 — 최근 실패 횟수로 시도를 제한한다(서버리스라 인메모리 카운트는 무력하다)
--   2) 「개인정보의 안전성 확보조치 기준」이 요구하는 개인정보처리시스템 접속기록
--      (개인정보처리방침 제9조가 "접속기록의 1년 이상 보관"을 고지하고 있다)
-- IP는 상담과 같은 원칙으로 원본을 저장하지 않고 IP_HASH_SECRET으로 HMAC한 값만 남긴다.
create table if not exists admin_access_log (
  id          bigint      generated always as identity primary key,
  success     boolean     not null,
  email       text,                      -- 시도한 계정(접속기록의 '계정' 항목). 실패 건은 입력값 그대로
  ip_hash     text,
  user_agent  text,
  created_at  timestamptz not null default now()
);

-- 예전 버전(이메일 칸이 없던 때)에 만든 테이블에도 칸을 더한다
alter table admin_access_log add column if not exists email text;

create index if not exists admin_access_log_ip_idx     on admin_access_log (ip_hash, created_at desc);
create index if not exists admin_access_log_recent_idx on admin_access_log (created_at desc);

create index if not exists consultations_created_at_idx     on consultations (created_at desc);
create index if not exists consultations_status_idx         on consultations (status, created_at desc);
create index if not exists consultations_ip_hash_idx        on consultations (ip_hash, created_at desc);
create index if not exists consultation_notes_parent_idx    on consultation_notes (consultation_id, created_at desc);
