import { ButtonHTMLAttributes, forwardRef } from "react";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger" | "custom";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** ボタンの見た目スタイル */
  variant?: ButtonVariant;
  /** ボタンのサイズ */
  size?: ButtonSize;
  /** ローディング状態（disabled + スピナー表示） */
  isLoading?: boolean;
}

// ─────────────────────────────────────────────────────────────────────────────
// Style maps
// ─────────────────────────────────────────────────────────────────────────────

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-notion-blue text-white border-transparent " +
    "hover:bg-notion-blue-active " +
    "active:scale-90 " +
    "disabled:bg-warm-300 disabled:text-white disabled:cursor-not-allowed",

  secondary:
    "bg-black/5 text-[rgba(0,0,0,0.95)] border-transparent " +
    "hover:bg-black/10 hover:scale-[1.02] " +
    "active:scale-90 " +
    "disabled:opacity-50 disabled:cursor-not-allowed",

  ghost:
    "bg-transparent text-[rgba(0,0,0,0.95)] border-transparent " +
    "hover:underline hover:text-notion-blue " +
    "active:scale-95 " +
    "disabled:opacity-40 disabled:cursor-not-allowed disabled:no-underline",

  danger:
    "bg-orange text-white border-transparent " +
    "hover:bg-[#b84a00] hover:scale-[1.02] " +
    "active:scale-90 " +
    "disabled:opacity-50 disabled:cursor-not-allowed",
  custom: "border-transparent disabled:opacity-50 disabled:cursor-not-allowed",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "text-caption font-semibold px-3 py-1.5 gap-1.5",
  md: "text-nav    font-semibold px-4 py-2   gap-2",
  lg: "text-body   font-bold     px-6 py-3   gap-2.5",
};

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      isLoading = false,
      disabled,
      className = "",
      children,
      type = "button",
      ...props
    },
    ref,
  ) => {
    const isDisabled = disabled || isLoading;

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        aria-disabled={isDisabled}
        aria-busy={isLoading}
        className={[
          // Base
          "inline-flex items-center justify-center",
          "border rounded-micro",
          "font-sans leading-none",
          "transition-all duration-[160ms] ease-[cubic-bezier(0.25,0.1,0.25,1)]",
          "outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-1",
          "select-none cursor-pointer",
          // Variant
          variantStyles[variant],
          // Size
          sizeStyles[size],
          // External
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...props}
      >
        {/* Loading spinner */}
        {isLoading && (
          <span
            aria-hidden="true"
            className="inline-block w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin-slow"
          />
        )}
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";
