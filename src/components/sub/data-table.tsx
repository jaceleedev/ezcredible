import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** 셀은 그냥 노드이거나, 세로 병합(rowSpan)이 필요한 경우 객체로 준다. null이면 병합된 자리라 건너뛴다 */
export type Cell = ReactNode | { content: ReactNode; rowSpan?: number; className?: string } | null;

type DataTableProps = {
  columns: ReactNode[];
  rows: Cell[][];
  /** 첫 열을 행 제목처럼 강조 */
  rowHeader?: boolean;
  /** 표 아래 주석 */
  note?: ReactNode;
  /** 좁은 화면에서 가로 스크롤이 시작되는 최소 폭 */
  minWidth?: string;
  /** 열 너비(colgroup). 병합 셀이 있는 표는 자동 배분이 어색해서 직접 준다 */
  columnWidths?: string[];
  className?: string;
};

function isCellObject(cell: Cell): cell is { content: ReactNode; rowSpan?: number; className?: string } {
  return typeof cell === "object" && cell !== null && !Array.isArray(cell) && "content" in cell;
}

/**
 * 다열 표 — 비교표·등급표·자금별 조건표. KeyValueTable(2열)과 같은 스타일이고,
 * 모바일에서는 표 자체가 가로로 스크롤된다(페이지는 가로로 움직이지 않는다).
 */
export function DataTable({ columns, rows, rowHeader = true, note, minWidth = "640px", columnWidths, className }: DataTableProps) {
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <div className="overflow-x-auto rounded-3xl border border-line [scrollbar-width:thin]">
        <table className="w-full border-collapse text-[15px]" style={{ minWidth }}>
          {columnWidths && (
            <colgroup>
              {columnWidths.map((width, i) => (
                <col key={i} style={{ width }} />
              ))}
            </colgroup>
          )}
          <thead>
            <tr className="bg-soft text-left text-cobalt-700">
              {columns.map((col, i) => (
                <th
                  key={i}
                  scope="col"
                  className={cn("px-6 py-4 font-bold whitespace-nowrap sm:py-5", rowHeader && i === 0 && "sticky left-0 z-[1] bg-soft")}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, r) => (
              <tr key={r} className="border-t border-line">
                {row.map((cell, c) => {
                  if (cell === null) return null;
                  const obj = isCellObject(cell) ? cell : { content: cell };
                  const header = rowHeader && c === 0;
                  const Tag = header ? "th" : "td";
                  return (
                    <Tag
                      key={c}
                      scope={header ? "row" : undefined}
                      rowSpan={obj.rowSpan}
                      className={cn(
                        "px-6 py-4 text-left align-top leading-relaxed sm:py-5",
                        // 행 제목은 단어 중간에서 끊기지 않게 최소 폭을 주고, 가로 스크롤 중에도 왼쪽에 고정한다
                        header
                          ? "sticky left-0 z-[1] min-w-40 bg-soft-2 font-bold text-ink shadow-[1px_0_0_var(--color-line)] [overflow-wrap:normal]"
                          : "text-slate-800",
                        obj.rowSpan && obj.rowSpan > 1 && "border-r border-line",
                        obj.className,
                      )}
                    >
                      {obj.content}
                    </Tag>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="px-1 text-[13px] leading-relaxed text-muted md:hidden">표를 옆으로 밀면 전체 내용을 볼 수 있습니다.</p>
      {note && <p className="px-1 text-[13px] leading-relaxed text-muted">{note}</p>}
    </div>
  );
}
