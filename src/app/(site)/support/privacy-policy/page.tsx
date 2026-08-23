import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { DevLabel } from "@/components/home/dev-label";
import { DataTable } from "@/components/sub/data-table";
import { SubHero } from "@/components/sub/sub-hero";
import { Callout } from "@/components/ui/callout";
import { Container } from "@/components/ui/container";
import { KeyValueTable } from "@/components/ui/key-value-table";
import { Pill } from "@/components/ui/pill";
import { privacyIntro, privacyMeta as page, privacySections, type PolicyBlock } from "@/content/pages/privacy";
import { company, privacyOfficer } from "@/content/site";

export const metadata: Metadata = pageMetadata({ title: page.title, description: page.metaDescription, href: page.href });

function Block({ block }: { block: PolicyBlock }) {
  switch (block.type) {
    case "p":
      return <p className="text-base leading-[1.85] text-slate-700">{block.text}</p>;
    case "list":
      return (
        <ul className="flex flex-col gap-1.5 text-base leading-relaxed text-slate-700">
          {block.items.map((item) => (
            <li key={item} className="flex gap-2.5">
              <span aria-hidden="true" className="font-extrabold text-brand">
                ·
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case "kv":
      return <KeyValueTable rows={block.rows} />;
    case "table":
      return <DataTable columns={block.columns} rows={block.rows} rowHeader={false} minWidth="560px" />;
    case "note":
      return (
        <Callout tone="gold" className="text-base">
          {block.text}
        </Callout>
      );
  }
}

/** 제12조 보호책임자 — site.ts의 값으로 표를 만든다. 비어 있는 연락처는 표시하지 않는다 */
const officerRows = [
  { label: "성명", value: privacyOfficer.name },
  { label: "직책", value: privacyOfficer.title },
  ...(privacyOfficer.email ? [{ label: "이메일", value: privacyOfficer.email }] : []),
  ...(privacyOfficer.phone ? [{ label: "전화", value: privacyOfficer.phone }] : []),
  { label: "주소", value: company.address },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <SubHero href={page.href} title={page.title} subtitle={page.subtitle} image={{ src: "/images/banners/support.jpg", alt: "헤드셋을 쓴 상담 전문가와 말풍선 3D 오브젝트" }} />

      <Container size="narrow" className="flex flex-col gap-12 pb-24 pt-20 md:gap-14 md:pt-24">
        <header className="flex flex-col gap-5">
          <div className="flex flex-wrap gap-2">
            <Pill tone="brand">제정 {page.enacted}</Pill>
            <Pill tone="gold">개정·시행 {page.revised}</Pill>
          </div>
          <p className="text-base leading-[1.85] text-slate-700">{privacyIntro}</p>
          <nav aria-label="조항 목차" className="rounded-3xl border border-line bg-soft-2 p-6">
            <div className="mb-3 text-[13px] font-bold tracking-[0.08em] text-muted">목차</div>
            <ol className="grid gap-x-6 gap-y-1.5 text-[15px] sm:grid-cols-2">
              {privacySections.map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`} className="font-semibold text-cobalt-700 hover:underline">
                    {section.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </header>

        {privacySections.map((section) => (
          <section key={section.id} id={section.id} className="flex scroll-mt-28 flex-col gap-5">
            <h2 className="text-h3 border-b border-line pb-3">{section.title}</h2>
            {section.blocks.map((block, i) => (
              <Block key={i} block={block} />
            ))}
            {section.id === "officer" && (
              <div className="relative">
                {!privacyOfficer.email && !privacyOfficer.phone && (
                  <DevLabel className="-top-3 right-3">보호책임자 연락처 필요 · TODO(client)</DevLabel>
                )}
                <KeyValueTable rows={officerRows} />
              </div>
            )}
          </section>
        ))}
      </Container>
    </>
  );
}
