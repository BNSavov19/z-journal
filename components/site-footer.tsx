export const SiteFooter = () => (
  <footer className="relative overflow-hidden border-t border-border bg-white">
    <div className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,#403995,#ffbe54,#f66e52,#1da090,#dc2964)]" />
    <div className="pointer-events-none absolute -right-20 top-16 h-40 w-40 bg-accent5/20" style={{ clipPath: "polygon(0 0, 100% 20%, 70% 100%, 10% 80%)" }} />
    <div className="mx-auto grid w-full max-w-6xl gap-8 px-6 py-12 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10">
            <img src="/logo.svg" alt="Z Journal logo" className="h-10 w-10" />
          </div>
          <div>
            <p className="font-display text-2xl text-foreground">Z Journal</p>
            <p className="text-sm text-slate-600">
              Новини и истории от Gen Z - за Gen Z.
            </p>
          </div>
        </div>
        <p className="text-sm text-slate-600">
          Ежедневни репортажи и дългосрочни анализи, разказващи случващото се около нас, написани на наш език, с нашия поглед и нашия ритьм.
        </p>
      </div>
      <div className="text-sm text-slate-600">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          Редакции
        </p>
        <div className="mt-4 space-y-2">
          <p>Общество & Култура</p>
          <p>Млади хора & Идентичност</p>
          <p>Медии, технологии & социални мрежи</p>
          <p>Образование & бъдеще</p>
        </div>
      </div>
      <div className="text-sm text-slate-600">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          Контакт
        </p>
        <div className="mt-4 space-y-2">
          <p>desislavaaa.todorova@gmail.com</p>
          <p>
            <a href="https://www.instagram.com/zjournal_sofia?igsh=anJ3YnI5YmxkMHJ2">Instagram</a>
          </p>
          <p>Редакция: София, НБУ</p>
        </div>
        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          © 2025 Z Journal | GEN Z Newsroom
        </p>
      </div>
    </div>
  </footer>
);
