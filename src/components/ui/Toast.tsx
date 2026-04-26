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

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export type ToastVariant = "success" | "error" | "info";

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

// ─────────────────────────────────────────────────────────────────────────────
// Context
// ─────────────────────────────────────────────────────────────────────────────

const ToastContext = createContext<ToastContextValue | null>(null);

// ─────────────────────────────────────────────────────────────────────────────
// Variant styles
// ─────────────────────────────────────────────────────────────────────────────

const variantConfig: Record<ToastVariant, { bg: string; icon: ReactNode; label: string }> = {
  success: {
    bg: "bg-[#104d1e]",
    label: "成功",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <circle cx="8" cy="8" r="7" stroke="rgba(255,255,255,0.6)" strokeWidth="1.2" />
        <path
          d="M5 8l2 2 4-4"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  error: {
    bg: "bg-[#6b2000]",
    label: "エラー",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <circle cx="8" cy="8" r="7" stroke="rgba(255,255,255,0.6)" strokeWidth="1.2" />
        <path d="M10 6L6 10M6 6l4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  info: {
    bg: "bg-warm-900",
    label: "情報",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <circle cx="8" cy="8" r="7" stroke="rgba(255,255,255,0.6)" strokeWidth="1.2" />
        <path d="M8 7v4" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="8" cy="5" r="0.75" fill="white" />
      </svg>
    ),
  },
};

function ToastElement({ item, onDismiss }: { item: ToastItem; onDismiss: (id: string) => void }) {
  const config = variantConfig[item.variant];
  const duration = item.duration ?? 3000;
  const [exiting, setExiting] = useState(false);

  // プログレスバー用
  const [progress, setProgress] = useState(100);
  const rafRef = useRef<number>(null);
  const startRef = useRef<number>(null);

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
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [duration, item.id, onDismiss]);

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={`${config.label}: ${item.message}`}
      className={[
        "relative overflow-hidden",
        "flex items-center gap-2",
        "min-w-[240px] max-w-[400px] px-4 py-2.5",
        "rounded-sm",
        "[box-shadow:rgba(0,0,0,0.01)_0px_1px_3px,rgba(0,0,0,0.02)_0px_3px_7px,rgba(0,0,0,0.02)_0px_7px_15px,rgba(0,0,0,0.04)_0px_14px_28px,rgba(0,0,0,0.05)_0px_23px_52px]",
        config.bg,
        "text-white/92",
        "text-nav font-medium",
        exiting ? "animate-fade-down" : "animate-slide-up",
        "transition-all duration-[300ms]",
      ].join(" ")}
    >
      {/* Icon */}
      <span className="shrink-0">{config.icon}</span>

      {/* Message */}
      <span className="flex-1 text-left">{item.message}</span>

      {/* Dismiss button */}
      <button
        type="button"
        aria-label="通知を閉じる"
        onClick={() => {
          setExiting(true);
          setTimeout(() => onDismiss(item.id), 300);
        }}
        className="shrink-0 opacity-60 hover:opacity-100 transition-opacity duration-[160ms] ml-1"
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

      {/* Progress bar */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 h-[2px] bg-white/30 transition-none"
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
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{show}}>
      {children}

      {mounted &&
        createPortal(
          <div
            aria-live="polite"
            aria-atomic="false"
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] flex flex-col gap-2 items-center pointer-events-none"
          >
           {toasts.map((t) => (
              <div key={t.id} className="pointer-events-auto">
                <ToastElement item={t} onDismiss={dismiss} />
              </div>
            ))}
          </div>,
          document.body
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
  } as const;
}
