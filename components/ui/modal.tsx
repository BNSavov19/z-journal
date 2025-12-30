"use client";

import { useEffect } from "react";
import { cn } from "../../lib/utils";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
};

export const Modal = ({ open, onClose, title, description, children }: ModalProps) => {
  useEffect(() => {
    if (!open) {
      return;
    }
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-6 py-10">
      <button
        type="button"
        aria-label="Close modal"
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />
      <div
        className={cn(
          "relative w-full max-w-3xl rounded-[32px] border border-border bg-white p-6 shadow-soft"
        )}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              {title}
            </p>
            {description && (
              <p className="mt-2 text-sm text-slate-600">{description}</p>
            )}
          </div>
          <button
            type="button"
            className="rounded-full border border-border px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 hover:border-accent hover:text-accent"
            onClick={onClose}
          >
            Close
          </button>
        </div>
        <div className="mt-6">{children}</div>
      </div>
    </div>
  );
};
