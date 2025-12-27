export const SiteFooter = () => (
  <footer className="border-t border-border bg-muted">
    <div className="mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-6 px-6 py-10 md:flex-row">
      <div className="flex items-center gap-3">
        <img src="/logo.svg" alt="Z Journal logo" className="h-10 w-10" />
        <div>
          <p className="font-display text-2xl text-foreground">Z Journal</p>
          <p className="text-sm text-slate-600">
            Independent financial journalism for the modern economy.
          </p>
        </div>
      </div>
      <div className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
        © 2024 Z Journal Newsroom
      </div>
    </div>
  </footer>
);
