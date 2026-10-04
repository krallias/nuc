"use client";
import { useEffect, useId, useRef } from "react";
import { isTopLayer, pushLayer, removeLayer } from "@/lib/layers";

/** Accessible panel/bottom-sheet primitive: Escape closes top layer only, focus returns to the opener. */
export default function Sheet({ open, onClose, title, children }: {
  open: boolean; onClose: () => void; title: string; children: React.ReactNode;
}) {
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const opener = document.activeElement as HTMLElement | null;
    pushLayer(id);
    ref.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isTopLayer(id)) { e.stopPropagation(); onClose(); }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      removeLayer(id);
      opener?.focus();
    };
  }, [open, id, onClose]);
  if (!open) return null;
  return (
    <div ref={ref} role="dialog" aria-modal="false" aria-labelledby={`${id}-t`} tabIndex={-1}
      style={{ position: "fixed", left: 0, right: 0, bottom: 0, maxHeight: "70vh", overflow: "auto",
        background: "var(--paper)", borderTop: "1px solid var(--line)", padding: "1rem 1.25rem", zIndex: 20 }}>
      <h2 id={`${id}-t`}>{title}</h2>
      {children}
      <button type="button" onClick={onClose}>×</button>
    </div>
  );
}
