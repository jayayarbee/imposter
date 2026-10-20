"use client";
import { useEffect, useState } from "react";
import { ArrowLeft, Check, Minus, Plus, X } from "lucide-react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "danger";
};

const variants = {
  primary: "bg-accent text-accent-ink hover:opacity-90",
  secondary: "border border-line bg-surface hover:bg-subtle",
  ghost: "text-muted hover:bg-subtle hover:text-ink",
  danger: "border border-line text-danger hover:bg-subtle",
};

export function Button({ variant = "primary", className = "", type = "button", ...props }: ButtonProps) {
  return (
    <button
      type={type}
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-lg px-5 text-base font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${className}`}
      {...props}
    />
  );
}

export function Screen({
  title,
  onBack,
  right,
  footer,
  children,
  noSelect,
}: {
  title?: string;
  onBack?: () => void;
  right?: React.ReactNode;
  footer?: React.ReactNode;
  children: React.ReactNode;
  noSelect?: boolean;
}) {
  return (
    <main
      className={`fade-in mx-auto flex min-h-[100dvh] w-full max-w-md flex-col px-5 pt-[max(1rem,env(safe-area-inset-top))] ${noSelect ? "no-select" : ""}`}
    >
      {(title || onBack || right) && (
        <header className="mb-6 flex min-h-11 items-center justify-between gap-2">
          <div className="flex items-center gap-1">
            {onBack && (
              <button
                type="button"
                onClick={onBack}
                aria-label="Back"
                className="-ml-2 flex h-11 w-11 items-center justify-center rounded-lg text-muted hover:bg-subtle hover:text-ink"
              >
                <ArrowLeft size={20} aria-hidden />
              </button>
            )}
            {title && <h1 className="text-lg font-semibold">{title}</h1>}
          </div>
          {right}
        </header>
      )}
      <div className="flex-1 pb-6">{children}</div>
      {footer ? (
        <div className="sticky bottom-0 -mx-5 border-t border-line bg-canvas px-5 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3">
          <div className="flex flex-col gap-2">{footer}</div>
        </div>
      ) : (
        <div className="h-[env(safe-area-inset-bottom)]" />
      )}
    </main>
  );
}

export function Section({ title, hint, children }: { title: string; hint?: string; children: React.ReactNode }) {
  return (
    <section className="space-y-3 border-b border-line pb-6 pt-6 first:pt-0 last:border-b-0">
      <div>
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">{title}</h2>
        {hint && <p className="mt-1 text-sm text-muted">{hint}</p>}
      </div>
      {children}
    </section>
  );
}

export function Segmented<T extends string | number>({
  label,
  value,
  options,
  onChange,
  columns,
}: {
  label: string;
  value: T;
  options: { value: T; label: string }[];
  onChange: (v: T) => void;
  columns?: number;
}) {
  return (
    <div
      role="radiogroup"
      aria-label={label}
      className="grid gap-1 rounded-lg border border-line bg-subtle p-1"
      style={{ gridTemplateColumns: `repeat(${columns ?? options.length}, minmax(0, 1fr))` }}
    >
      {options.map((o) => {
        const on = o.value === value;
        return (
          <button
            key={String(o.value)}
            type="button"
            role="radio"
            aria-checked={on}
            onClick={() => onChange(o.value)}
            className={`min-h-11 rounded-md border px-2 text-sm transition-colors ${
              on ? "border-line bg-surface font-medium text-ink shadow-sm" : "border-transparent text-muted hover:text-ink"
            }`}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

export function Stepper({
  label,
  value,
  min,
  max,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
}) {
  const btn =
    "flex h-11 w-11 items-center justify-center rounded-lg border border-line bg-surface hover:bg-subtle disabled:opacity-40";
  return (
    <div className="flex items-center gap-4" role="group" aria-label={label}>
      <button type="button" className={btn} onClick={() => onChange(value - 1)} disabled={value <= min} aria-label={`Decrease ${label}`}>
        <Minus size={18} aria-hidden />
      </button>
      <span className="min-w-8 text-center text-xl font-semibold tabular-nums" aria-live="polite">
        {value}
      </span>
      <button type="button" className={btn} onClick={() => onChange(value + 1)} disabled={value >= max} aria-label={`Increase ${label}`}>
        <Plus size={18} aria-hidden />
      </button>
    </div>
  );
}

export function Toggle({ label, description, checked, onChange }: { label: string; description?: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="flex min-h-12 w-full items-center justify-between gap-4 rounded-lg text-left"
    >
      <span>
        <span className="block text-base">{label}</span>
        {description && <span className="block text-sm text-muted">{description}</span>}
      </span>
      <span className={`flex h-7 w-12 shrink-0 items-center rounded-full border border-line p-0.5 transition-colors ${checked ? "bg-accent" : "bg-subtle"}`}>
        <span className={`h-5 w-5 rounded-full bg-surface shadow transition-transform ${checked ? "translate-x-5" : ""}`} />
      </span>
    </button>
  );
}

export function Chip({ selected, disabled, onClick, children }: { selected: boolean; disabled?: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      disabled={disabled}
      onClick={onClick}
      className={`flex min-h-11 items-center justify-between gap-2 rounded-lg border px-3 text-left text-sm transition-colors ${
        selected ? "border-accent bg-subtle font-medium text-ink" : "border-line bg-surface text-muted hover:text-ink"
      }`}
    >
      <span>{children}</span>
      {selected && <Check size={16} className="shrink-0 text-accent" aria-hidden />}
    </button>
  );
}

export function Issues({ messages }: { messages: string[] }) {
  return (
    <div aria-live="polite">
      {messages.length > 0 && (
        <ul className="space-y-1 rounded-lg border border-line bg-surface p-3 text-sm text-danger">
          {messages.map((m) => (
            <li key={m}>{m}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

/** Two-step "end game" button so it can't be hit by accident. */
export function EndGameButton({ onConfirm }: { onConfirm: () => void }) {
  const [armed, setArmed] = useState(false);
  useEffect(() => {
    if (!armed) return;
    const t = setTimeout(() => setArmed(false), 4000);
    return () => clearTimeout(t);
  }, [armed]);
  return (
    <button
      type="button"
      onClick={() => (armed ? onConfirm() : setArmed(true))}
      className={`flex min-h-11 items-center gap-1 rounded-lg px-3 text-sm ${armed ? "bg-subtle text-danger" : "text-muted hover:bg-subtle hover:text-ink"}`}
    >
      <X size={16} aria-hidden />
      {armed ? "Tap again to end" : "End game"}
    </button>
  );
}
