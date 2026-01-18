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

type ModalFooterProps = {
  children: React.ReactNode;
  className?: string;
};

export const ModalFooter = ({ children, className }: ModalFooterProps) => (
  <div
    className={cn(
      "sticky bottom-0 z-10 -mx-6 mt-6 border-t border-border bg-white px-6 py-4",
      className
    )}
  >
    {children}
  </div>
);

export const Modal = ({
  open,
  onClose,
  title,
  description,
  children
}: ModalProps) => {
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
          "relative w-full max-w-3xl overflow-hidden rounded-[32px] border border-border bg-white shadow-soft"
        )}
      >
        <div className="flex max-h-[calc(100vh-5rem)] flex-col overflow-y-auto px-6 pb-6 pt-4">
          <div className="sticky top-0 z-10 -mx-6 mb-6 bg-white px-6 pt-2">
            <div className="flex items-start justify-between gap-4 border-b border-border pb-4">
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
          </div>
          <div className="flex-1 pr-1">{children}</div>
        </div>
      </div>
    </div>
  );
};
