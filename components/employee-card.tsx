import type { Employee } from "../lib/types";
import { getImageUrl } from "../lib/utils";

export const EmployeeCard = ({ employee }: { employee: Employee }) => (
  <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
    <img
      src={getImageUrl(employee.image)}
      alt={employee.name}
      className="h-48 w-full rounded-xl object-cover"
    />
    <h3 className="mt-4 font-display text-2xl text-foreground">
      {employee.name}
    </h3>
    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
      {employee.role}
    </p>
    <p className="mt-2 text-sm text-slate-600">{employee.bio}</p>
  </div>
);
