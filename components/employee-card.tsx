import type { Employee } from "../lib/types";
import { getImageUrl } from "../lib/utils";

export const EmployeeCard = ({ employee }: { employee: Employee }) => (
  <div className="rounded-3xl border border-border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-soft">
    <div className="relative">
      <img
        src={getImageUrl(employee.image)}
        alt={employee.name}
        className="h-48 w-full rounded-2xl object-cover"
      />
      <div className="absolute -bottom-3 left-4 rounded-full bg-white px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-accent shadow-sm">
        {employee.role}
      </div>
    </div>
    <h3 className="mt-6 font-display text-2xl text-foreground">
      {employee.name}
    </h3>
    <p className="mt-2 text-sm text-slate-600">{employee.bio}</p>
  </div>
);
