"use client";

import Link from "next/link";
import { useState } from "react";

const links = [
  { href: "/", label: "Начало" },
  { href: "/articles", label: "Статии" },
  { href: "/podcasts", label: "Подкасти" },
  { href: "/gallery", label: "Галерия" },
  { href: "/about", label: "За нас" },
  { href: "/admin", label: "Админ" }
];

export const SiteNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="border-b border-border bg-white">
      <div className="h-1 bg-[linear-gradient(90deg,#403995,#ffbe54,#f66e52,#1da090,#dc2964)]" />
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10">
            <img src="/z-journal-logo.webp" alt="Z Journal logo" className="h-10 w-10" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-accent">
              Z Journal
            </p>
            <p className="font-display text-2xl text-foreground">
              Новините през погледа на Gen Z
            </p>
          </div>
        </div>
        <nav className="hidden items-center gap-8 text-sm font-semibold text-slate-600 lg:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-accent">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href="/articles"
            className="hidden rounded-full border border-accent px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent hover:bg-accent hover:text-white md:inline-flex"
          >
            Най-ново
          </Link>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-slate-600 hover:border-accent hover:text-accent md:hidden"
            aria-label="Превключи навигацията"
            aria-expanded={isOpen}
            aria-controls="mobile-nav"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <span className="sr-only">Превключи навигацията</span>
            <div className="flex flex-col gap-1">
              <span className="h-0.5 w-5 rounded-full bg-current" />
              <span className="h-0.5 w-5 rounded-full bg-current" />
              <span className="h-0.5 w-5 rounded-full bg-current" />
            </div>
          </button>
        </div>
      </div>
      {isOpen && (
        <div id="mobile-nav" className="border-t border-border bg-white md:hidden">
          <nav className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-4 text-sm font-semibold text-slate-600">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center justify-between"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/articles"
              className="inline-flex w-fit rounded-full border border-accent px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent"
              onClick={() => setIsOpen(false)}
            >
              Най-ново
            </Link>
            <Link
              href="/podcasts"
              className="inline-flex w-fit rounded-full bg-accent px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white"
              onClick={() => setIsOpen(false)}
            >
              Абонирай се
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};
