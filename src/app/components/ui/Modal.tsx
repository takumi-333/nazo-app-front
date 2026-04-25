"use client";

import {
  forwardRef,
  HTMLAttributes,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
} from "react";

import { createPortal } from "react-dom";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export interface ModalProps {
  /** モーダルの表示・非表示 */
  open: boolean;
  /** 閉じるときのコールバック（ESC / 背景クリック） */
  onClose: () => void;
  /** モーダルのタイトル（aria-labelledby に使用） */
  title?: string;
  /** モーダルの説明（aria-describedby に使用） */
  description?: string;
  /** 背景クリックで閉じるか（デフォルト: true） */
  closeOnBackdrop?: boolean;
  /** コンテンツ */
  children: ReactNode;
  /** モーダルパネルの最大幅（デフォルト: 480px） */
  maxWidth?: string;
  /** 追加クラス（パネル側） */
  className?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────────────────────────────────────

export function ModalHeader({
  children,
  className = "",
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`mb-4 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function ModalTitle({
  children,
  id,
  className = "",
}: {
  children: ReactNode;
  id?: string;
  className?: string;
}) {
  return (
    <h2
      id={id}
      className={`text-subhead font-bold text-[rgba(0,0,0,0.95)] leading-[1.23] tracking-[-0.625px] ${className}`}
    >
      {children}
    </h2>
  );
}

export function ModalBody({
  children,
  className = "",
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`text-body text-warm-700 leading-[1.5] ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function ModalFooter({
  children,
  className = "",
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`mt-8 flex items-center justify-end gap-3 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main Modal component
// ─────────────────────────────────────────────────────────────────────────────

export function Modal({
  open,
  onClose,
  title,
  description,
  closeOnBackdrop = true,
  children,
  maxWidth = "480px",
  className = "",
}: ModalProps) {
  const panelRef   = useRef<HTMLDivElement>(null);
  const titleId    = useRef(`modal-title-${Math.random().toString(36).slice(2, 9)}`).current;
  const descId     = useRef(`modal-desc-${Math.random().toString(36).slice(2, 9)}`).current;

  // ESC キーで閉じる
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  // body スクロールロック
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  // 開いた直後にパネルにフォーカス（キーボードトラップの起点）
  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => panelRef.current?.focus());
    }
  }, [open]);

  // 背景クリックで閉じる
  const handleBackdropClick = useCallback(() => {
    if (closeOnBackdrop) onClose();
  }, [closeOnBackdrop, onClose]);

  if (!open) return null;

  return createPortal(
    // Overlay
    <div
      role="presentation"
      className={[
        "fixed inset-0 z-[1000]",
        "flex items-center justify-center p-4",
        // glass backdrop
        "bg-black/35 backdrop-blur-[2px]",
        "animate-fade-in",
      ].join(" ")}
      onClick={handleBackdropClick}
    >
      {/* Panel */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        aria-describedby={description ? descId : undefined}
        tabIndex={-1}
        style={{ maxWidth }}
        className={[
          "relative w-full",
          "bg-white",
          "border border-[rgba(0,0,0,0.1)]",
          "rounded-lg",
          // 5-layer deep shadow
          "[box-shadow:rgba(0,0,0,0.01)_0px_1px_3px,rgba(0,0,0,0.02)_0px_3px_7px,rgba(0,0,0,0.02)_0px_7px_15px,rgba(0,0,0,0.04)_0px_14px_28px,rgba(0,0,0,0.05)_0px_23px_52px]",
          "p-8",
          "outline-none",
          "animate-scale-in",
          className,
        ].join(" ")}
        // パネル内のクリックがオーバーレイに伝播しないように止める
        onClick={(e) => e.stopPropagation()}
      >
        {/* スクリーンリーダー用タイトル（hidden でも id は必要） */}
        {title && (
          <ModalTitle id={titleId}>{title}</ModalTitle>
        )}
        {description && (
          <p id={descId} className="sr-only">
            {description}
          </p>
        )}

        {/* 閉じるボタン */}
        <button
          type="button"
          aria-label="閉じる"
          onClick={onClose}
          className={[
            "absolute top-4 right-4",
            "w-8 h-8 flex items-center justify-center",
            "rounded-micro text-warm-500",
            "hover:bg-warm-100 hover:text-[rgba(0,0,0,0.95)]",
            "transition-colors duration-[160ms]",
            "focus-visible:ring-2 focus-visible:ring-focus outline-none",
          ].join(" ")}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M12 4L4 12M4 4l8 8"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>

        {children}
      </div>
    </div>,
    document.body,
  );
}