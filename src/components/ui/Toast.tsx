"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

export type ToastVariant = "success" | "error" | "info" | "warning";

export interface ToastItem {
  id: string;
  message: string;
  variant: ToastVariant;
  /** 表示時間 ms（デフォルト: 3000） */
  duration?: number;
}

interface ToastContextValue {
  show: (message: string, variant?: ToastVariant, duration?: number) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

const variantConfig: Record<
  ToastVariant,
  {
    className: string;
    icon: ReactNode;
    label: string;
  }
> = {
  success: {
    className: "bg-success text-text-inverse border-success",
    label: "成功",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <circle cx="8" cy="8" r="7" stroke="currentColor" strokeOpacity="0.55" strokeWidth="1.2" />
        <path
          d="M5 8l2 2 4-4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },

  error: {
    className: "bg-danger text-text-inverse border-danger",
    label: "エラー",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <circle cx="8" cy="8" r="7" stroke="currentColor" strokeOpacity="0.55" strokeWidth="1.2" />
        <path
          d="M10 6L6 10M6 6l4 4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },

  info: {
    className: "bg-primary text-text-inverse border-primary",
    label: "情報",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <circle cx="8" cy="8" r="7" stroke="currentColor" strokeOpacity="0.55" strokeWidth="1.2" />
        <path d="M8 7v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="8" cy="5" r="0.75" fill="currentColor" />
      </svg>
    ),
  },

  warning: {
    className: "bg-warning text-text-inverse border-warning",
    label: "警告",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <circle cx="8" cy="8" r="7" stroke="currentColor" strokeOpacity="0.55" strokeWidth="1.2" />
        <path d="M8 4.5v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="8" cy="11" r="0.75" fill="currentColor" />
      </svg>
    ),
  },
};

function ToastElement({ item, onDismiss }: { item: ToastItem; onDismiss: (id: string) => void }) {
  const config = variantConfig[item.variant];
  const duration = item.duration ?? 3000;

  const [visible, setVisible] = useState(false);
  const [exiting, setExiting] = useState(false);
  const [progress, setProgress] = useState(100);

  const rafRef = useRef<number | null>(null);
  const enterRafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    enterRafRef.current = requestAnimationFrame(() => {
      setVisible(true);
    });

    return () => {
      if (enterRafRef.current !== null) {
        cancelAnimationFrame(enterRafRef.current);
      }
    };
  }, []);

  useEffect(() => {
    startRef.current = performance.now();

    const tick = (now: number) => {
      const elapsed = now - (startRef.current ?? now);
      const pct = Math.max(0, 100 - (elapsed / duration) * 100);

      setProgress(pct);

      if (elapsed >= duration) {
        setExiting(true);
        setTimeout(() => onDismiss(item.id), 300);
        return;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [duration, item.id, onDismiss]);

  const handleDismiss = () => {
    setExiting(true);
    setTimeout(() => onDismiss(item.id), 300);
  };

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={`${config.label}: ${item.message}`}
      className={[
        "relative overflow-hidden",
        "flex items-center gap-2.5",
        "min-w-[240px] max-w-[400px]",
        "px-4 py-2.5",
        "rounded-md border",
        "shadow-soft",
        "text-sm font-medium",
        "transition-all duration-300 ease-out",
        exiting || !visible
          ? "-translate-y-3 scale-[0.98] opacity-0"
          : "translate-y-0 scale-100 opacity-100",
        config.className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <span className="shrink-0">{config.icon}</span>

      <span className="flex-1 text-left leading-relaxed">{item.message}</span>

      <button
        type="button"
        aria-label="通知を閉じる"
        onClick={handleDismiss}
        className={[
          "ml-1 shrink-0",
          "rounded-sm p-0.5",
          "opacity-60 transition-opacity duration-150",
          "hover:opacity-100",
          "focus-visible:outline-none",
          "focus-visible:ring-2 focus-visible:ring-current/40",
        ].join(" ")}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path
            d="M11 3L3 11M3 3l8 8"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button>

      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 h-[2px] bg-current/30 transition-none"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const show = useCallback((message: string, variant: ToastVariant = "info", duration = 3000) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;

    setToasts((prev) => [...prev, { id, message, variant, duration }]);
  }, []);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ show }}>
      {children}

      {mounted &&
        createPortal(
          <div
            aria-live="polite"
            aria-atomic="false"
            className={[
              "pointer-events-none fixed top-6 left-1/2 z-[9999]",
              "flex -translate-x-1/2 flex-col items-center gap-2",
              "px-4",
            ].join(" ")}
          >
            {toasts.map((toast) => (
              <div key={toast.id} className="pointer-events-auto">
                <ToastElement item={toast} onDismiss={dismiss} />
              </div>
            ))}
          </div>,
          document.body,
        )}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);

  if (!ctx) {
    throw new Error("useToast must be used within <ToastProvider>");
  }

  return {
    show: ctx.show,
    success: (msg: string, dur?: number) => ctx.show(msg, "success", dur),
    error: (msg: string, dur?: number) => ctx.show(msg, "error", dur),
    info: (msg: string, dur?: number) => ctx.show(msg, "info", dur),
    warning: (msg: string, dur?: number) => ctx.show(msg, "warning", dur),
  } as const;
}
