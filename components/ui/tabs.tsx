"use client";

import * as React from "react";
import { cn } from "../../lib/utils";

type TabsContextValue = {
  value: string;
  setValue: (value: string) => void;
};

const TabsContext = React.createContext<TabsContextValue | null>(null);

export const Tabs = ({
  defaultValue,
  value: valueProp,
  onValueChange,
  className,
  children
}: {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
  children: React.ReactNode;
}) => {
  const [value, setValue] = React.useState(defaultValue ?? "");
  const controlled = valueProp !== undefined;

  const currentValue = controlled ? valueProp : value;
  const update = (next: string) => {
    if (!controlled) {
      setValue(next);
    }
    onValueChange?.(next);
  };

  return (
    <TabsContext.Provider value={{ value: currentValue, setValue: update }}>
      <div className={cn("space-y-6", className)}>{children}</div>
    </TabsContext.Provider>
  );
};

export const TabsList = ({
  className,
  children
}: {
  className?: string;
  children: React.ReactNode;
}) => (
  <div
    className={cn(
      "inline-flex gap-2 rounded-full border border-border bg-muted p-1",
      className
    )}
  >
    {children}
  </div>
);

export const TabsTrigger = ({
  value,
  className,
  children
}: {
  value: string;
  className?: string;
  children: React.ReactNode;
}) => {
  const ctx = React.useContext(TabsContext);
  if (!ctx) {
    return null;
  }
  const active = ctx.value === value;
  return (
    <button
      type="button"
      onClick={() => ctx.setValue(value)}
      className={cn(
        "rounded-full px-4 py-2 text-xs font-semibold transition",
        active
          ? "bg-white text-accent shadow-sm"
          : "text-slate-600 hover:text-accent",
        className
      )}
    >
      {children}
    </button>
  );
};

export const TabsContent = ({
  value,
  className,
  children
}: {
  value: string;
  className?: string;
  children: React.ReactNode;
}) => {
  const ctx = React.useContext(TabsContext);
  if (!ctx || ctx.value !== value) {
    return null;
  }
  return <div className={cn("space-y-4", className)}>{children}</div>;
};
