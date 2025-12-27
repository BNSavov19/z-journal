"use client";

import Link from "next/link";
import { useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/articles", label: "Articles" },
  { href: "/podcasts", label: "Podcasts" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/admin", label: "Admin" }
];

export const SiteNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="border-b border-border bg-white">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <img src="/logo.svg" alt="Z Journal logo" className="h-11 w-11" />
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
              Z Journal
            </p>
            <p className="font-display text-2xl text-foreground">
              The Global Market Journal
            </p>
          </div>
        </div>
        <nav className="hidden gap-6 text-sm font-semibold text-slate-600 md:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-accent">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href="/articles"
            className="hidden rounded-full border border-accent px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent hover:bg-accent hover:text-white sm:inline-flex"
          >
            Latest
          </Link>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-slate-600 hover:border-accent hover:text-accent md:hidden"
            aria-label="Toggle navigation"
            aria-expanded={isOpen}
            aria-controls="mobile-nav"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <span className="sr-only">Toggle navigation</span>
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
              Latest
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};
