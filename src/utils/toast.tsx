import { toast, type Toast } from "react-hot-toast";
import React from "react";

/**
 * A themed toast card that respects your global Tailwind theme:
 * - Uses `.surface` for light/dark tokens
 * - Accessible (role, aria-live)
 * - Dismiss button
 */
function ToastCard({
  t,
  icon,
  title,
  description,
  tone = "neutral",
}: {
  t: Toast;
  icon: React.ReactNode;
  title: string;
  description?: string;
  tone?: "success" | "error" | "neutral";
}) {
  const toneBorder =
    tone === "success"
      ? "border-emerald-300/60 dark:border-emerald-500/50"
      : tone === "error"
      ? "border-red-300/60 dark:border-red-500/50"
      : "border-gray-200 dark:border-gray-700";

  return (
    <div
      role="status"
      aria-live="polite"
      className={`pointer-events-auto card flex w-80 items-start gap-3 border ${toneBorder} ${
        t.visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="mt-0.5 text-lg">{icon}</div>
      <div className="min-w-0 flex-1">
        <div className="truncate font-semibold">{title}</div>
        {description ? (
          <div className="mt-0.5 truncate text-sm text-gray-600 dark:text-gray-300">
            {description}
          </div>
        ) : null}
      </div>
      <button
        onClick={() => toast.dismiss(t.id)}
        className="btn btn-outline px-2 py-1 text-xs"
        aria-label="Dismiss notification"
        title="Dismiss"
      >
        ✕
      </button>
    </div>
  );
}

/** Public helpers */
export function notifySuccess(title: string, description?: string) {
  toast.custom((t) => (
    <ToastCard t={t} icon={<span>✅</span>} title={title} description={description} tone="success" />
  ));
}

export function notifyError(title: string, description?: string) {
  toast.custom((t) => (
    <ToastCard t={t} icon={<span>❌</span>} title={title} description={description} tone="error" />
  ));
}

export function notifyInfo(title: string, description?: string) {
  toast.custom((t) => (
    <ToastCard t={t} icon={<span>ℹ️</span>} title={title} description={description} tone="neutral" />
  ));
}