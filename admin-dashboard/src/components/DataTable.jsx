import { useState } from "react";
import { ArrowUpDown, ArrowUp, ArrowDown, Check } from "lucide-react";

export default function DataTable({ columns, data, onRowClick, selectedIds, onToggleSelect }) {
  const [sortKey, setSortKey] = useState(null);
  const [sortDir, setSortDir] = useState("asc");

  const handleSort = (key, sortable) => {
    if (sortable === false) return;
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const sorted = [...data].sort((a, b) => {
    if (!sortKey) return 0;
    const av = a[sortKey];
    const bv = b[sortKey];
    if (av == null) return 1;
    if (bv == null) return -1;
    const cmp = typeof av === "number" ? av - bv : String(av).localeCompare(String(bv));
    return sortDir === "asc" ? cmp : -cmp;
  });

  const SortIcon = ({ colKey }) => {
    if (sortKey !== colKey) return <ArrowUpDown className="h-3 w-3 opacity-30" />;
    return sortDir === "asc" ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />;
  };

  return (
    <div
      className="overflow-hidden rounded-2xl"
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border-default)",
        boxShadow: "var(--shadow-card)",
      }}
    >
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr style={{ borderBottom: "1px solid var(--border-default)", background: "var(--bg-elevated)" }}>
              {onToggleSelect && (
                <th className="w-10 px-4 py-3">
                  <span className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
                    <Check className="h-3 w-3 opacity-0" />
                  </span>
                </th>
              )}
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-widest cursor-pointer select-none transition-colors hover:opacity-80"
                  style={{
                    color: "var(--text-muted)",
                    background: "var(--bg-elevated)",
                  }}
                  onClick={() => handleSort(col.key, col.sortable)}
                >
                  <div className="flex items-center gap-1.5">
                    {col.label}
                    {col.sortable !== false && <SortIcon colKey={col.key} />}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.map((row, i) => {
              const isSelected = selectedIds?.includes(row.id);
              return (
                <tr
                  key={row.id}
                  className="cursor-pointer transition-all duration-150"
                  style={{
                    borderBottom: "1px solid var(--border-subtle)",
                    background: isSelected
                      ? "rgba(218,115,32,0.06)"
                      : i % 2 === 0
                      ? "transparent"
                      : "var(--bg-hover)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "var(--bg-hover)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = isSelected
                      ? "rgba(218,115,32,0.06)"
                      : i % 2 === 0
                      ? "transparent"
                      : "var(--bg-hover)";
                  }}
                  onClick={() => onRowClick?.(row)}
                >
                  {onToggleSelect && (
                    <td className="w-10 px-4 py-3" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => onToggleSelect(row.id)}
                        className="flex h-5 w-5 items-center justify-center rounded-md border transition-all"
                        style={{
                          borderColor: isSelected ? "#da7320" : "var(--border-default)",
                          background: isSelected ? "#da7320" : "transparent",
                        }}
                      >
                        {isSelected && <Check className="h-3 w-3 text-white" />}
                      </button>
                    </td>
                  )}
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className="px-4 py-3.5 text-sm"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {col.render ? col.render(row[col.key], row) : row[col.key]}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
