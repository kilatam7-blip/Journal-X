import { useEffect, type ReactNode } from "react";
import { useUI } from "../context/UIContext";

export function Toasts() {
  const { toasts } = useUI();
  return (
    <div className="pointer-events-none fixed bottom-6 left-1/2 z-[100] flex w-full max-w-sm -translate-x-1/2 flex-col items-center gap-2 px-4">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="pointer-events-auto flex w-full items-center gap-3 rounded-full border border-[#e8b07a]/30 bg-[#15110d]/95 px-4 py-3 text-sm text-[#f5efe7] shadow-2xl shadow-black/60 backdrop-blur-xl animate-toast-in"
        >
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#e8b07a] text-[#0d0a07]">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} className="h-3 w-3">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </span>
          <span className="flex-1">{t.text}</span>
        </div>
      ))}
    </div>
  );
}

export function Modal({
  open,
  onClose,
  children,
  size = "md",
}: {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
}) {
  useEffect(() => {
    if (!open) return;
  }, [open]);

  if (!open) return null;

  const sizes = {
    sm: "max-w-md",
    md: "max-w-xl",
    lg: "max-w-3xl",
    xl: "max-w-5xl",
  };

  return (
    <div
      className="fixed inset-0 z-[90] flex items-end justify-center sm:items-center"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-fade-in" />
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full ${sizes[size]} max-h-[92vh] overflow-hidden rounded-t-3xl bg-[#15110d] shadow-2xl shadow-black/60 animate-scale-in sm:rounded-3xl`}
      >
        {children}
      </div>
    </div>
  );
}

export function Drawer({
  open,
  onClose,
  side = "right",
  children,
}: {
  open: boolean;
  onClose: () => void;
  side?: "right" | "left";
  children: ReactNode;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[90]" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-fade-in" />
      <div
        onClick={(e) => e.stopPropagation()}
        className={`absolute top-0 ${
          side === "right" ? "right-0" : "left-0"
        } flex h-full w-full max-w-md flex-col bg-[#15110d] shadow-2xl shadow-black/60 ${
          side === "right" ? "animate-slide-right" : "animate-slide-left"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
