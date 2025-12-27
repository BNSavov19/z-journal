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
      <section className="border-b border-border bg-muted">
        <div className="mx-auto w-full max-w-6xl px-6 py-16">
          <p className="section-title">About</p>
          <h1 className="font-display text-5xl text-foreground">
            A newsroom built for the new economy
          </h1>
          <p className="mt-4 max-w-3xl text-sm text-slate-600">
            Z Journal is a global business newsroom focused on clear,
            data-driven reporting. We connect markets, policy, and technology
            with human stories, helping leaders make decisions amid volatility.
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-border bg-white p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                Mission
              </p>
              <p className="mt-2 text-sm text-slate-600">
                Deliver independent financial journalism with clarity,
                confidence, and context.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-white p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                Coverage
              </p>
              <p className="mt-2 text-sm text-slate-600">
                Markets, geopolitics, business strategy, and emerging
                technologies.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-white p-6">
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
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {data.employees.map((employee) => (
            <EmployeeCard key={employee.id} employee={employee} />
          ))}
        </div>
      </section>
    </div>
  );
}
