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

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-text-inverse border-transparent " +
    "hover:bg-primary-hover hover:scale-[1.02] " +
    "active:scale-95",

  secondary:
    "bg-surface text-text-main border-border " +
    "hover:bg-surface-muted hover:scale-[1.02] " +
    "active:scale-95",

  ghost:
    "bg-transparent text-text-main border-transparent " +
    "hover:bg-surface-muted hover:text-primary " +
    "active:scale-95",

  danger:
    "bg-danger text-text-inverse border-transparent " +
    "hover:bg-danger-hover hover:scale-[1.02] " +
    "active:scale-95",

  custom: "border-transparent active:scale-95",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "text-sm font-semibold px-3 py-1.5 gap-1.5",
  md: "text-base    font-semibold px-4 py-2   gap-2",
  lg: "text-lg   font-bold     px-6 py-3   gap-2.5",
};

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
          "rounded-md border",
          "font-sans leading-none",
          "transition-all duration-150 ease-out",
          "outline-none",
          "select-none cursor-pointer",

          // Focus
          "focus-visible:ring-2",
          "focus-visible:ring-primary",
          "focus-visible:ring-offset-2",
          "focus-visible:ring-offset-canvas",

          // Disabled
          "disabled:pointer-events-none",
          "disabled:cursor-not-allowed",
          "disabled:bg-surface-muted",
          "disabled:text-text-muted",
          "disabled:border-border",
          "disabled:opacity-70",
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
            className="inline-block w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin"
          />
        )}
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";
