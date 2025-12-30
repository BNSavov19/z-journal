"use client";

import { EmployeeCard } from "../../components/employee-card";
import { useCMSData } from "../../lib/use-cms";

export default function AboutPage() {
  const { data } = useCMSData();

  if (!data) {
    return <div className="mx-auto max-w-6xl px-6 py-24">Loading...</div>;
  }

  return (
    <div className="bg-white">
      <section className="relative overflow-hidden border-b border-border bg-muted">
        <div className="pointer-events-none absolute -left-16 top-10 h-40 w-40 bg-accent4/30" style={{ clipPath: "polygon(0 0, 100% 20%, 80% 100%, 10% 85%)" }} />
        <div className="pointer-events-none absolute right-10 top-6 h-28 w-32 bg-accent2/70" style={{ clipPath: "polygon(50% 0, 100% 55%, 70% 100%, 0 75%)" }} />
        <div className="mx-auto w-full max-w-6xl px-6 py-16">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="section-title">About</p>
              <h1 className="font-display text-5xl text-foreground">
                A newsroom built for the new economy
              </h1>
              <p className="mt-4 max-w-3xl text-sm text-slate-600">
                Z Journal is a global business newsroom focused on clear,
                data-driven reporting. We connect markets, policy, and technology
                with human stories, helping leaders make decisions amid volatility.
              </p>
            </div>
            <div className="rounded-3xl border border-border bg-white p-6 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                Our promise
              </p>
              <h2 className="mt-3 font-display text-3xl text-foreground">
                Clarity, rigor, and a modern lens.
              </h2>
              <p className="mt-3 text-sm text-slate-600">
                Every story is built to explain what matters, why it shifts, and
                how leaders should respond.
              </p>
            </div>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl border border-border bg-white p-6 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                Mission
              </p>
              <p className="mt-2 text-sm text-slate-600">
                Deliver independent financial journalism with clarity,
                confidence, and context.
              </p>
            </div>
            <div className="rounded-3xl border border-border bg-white p-6 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                Coverage
              </p>
              <p className="mt-2 text-sm text-slate-600">
                Markets, geopolitics, business strategy, and emerging
                technologies.
              </p>
            </div>
            <div className="rounded-3xl border border-border bg-white p-6 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                Values
              </p>
              <p className="mt-2 text-sm text-slate-600">
                Accuracy, transparency, and a deep respect for our readers.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-16">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-end">
          <div>
            <p className="section-title">Team</p>
            <h2 className="font-display text-4xl text-foreground">
              Meet the newsroom
            </h2>
            <p className="mt-3 max-w-2xl text-sm text-slate-600">
              The people shaping our coverage, available in the CMS to keep the
              team list current and accurate.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { label: "Editors", value: "28" },
              { label: "Bureaus", value: "12" },
              { label: "Partners", value: "40+" },
              { label: "Years of coverage", value: "15" }
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-border bg-muted px-4 py-3 text-center"
              >
                <p className="text-lg font-semibold text-foreground">
                  {item.value}
                </p>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {data.employees.map((employee) => (
            <EmployeeCard key={employee.id} employee={employee} />
          ))}
        </div>
      </section>
    </div>
  );
}
