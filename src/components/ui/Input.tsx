import { forwardRef, InputHTMLAttributes, useId } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** ラベルテキスト */
  label: string;
  /** ラベルを視覚的に非表示にする */
  hideLabel?: boolean;
  /** バリデーションエラーメッセージ */
  error?: string;
  /** 補足説明テキスト */
  description?: string;
}

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { label, hideLabel = false, error, description, id, className, disabled, required, ...props },
    ref,
  ) => {
    const generatedId = useId();

    const inputId = id ?? generatedId;
    const descriptionId = `${inputId}-description`;
    const errorId = `${inputId}-error`;

    const hasError = Boolean(error);

    const describedBy = [description && descriptionId, hasError && errorId]
      .filter(Boolean)
      .join(" ");

    return (
      <div className="flex w-full flex-col gap-1.5">
        <label
          htmlFor={inputId}
          className={cn(
            hideLabel && "sr-only",
            "text-sm font-semibold leading-normal",
            disabled ? "cursor-not-allowed text-text-muted" : "text-text-main",
          )}
        >
          {label}

          {required && !hideLabel && (
            <span aria-hidden="true" className="ml-1 text-danger">
              *
            </span>
          )}

          {required && hideLabel && <span className="sr-only"> 必須</span>}
        </label>

        <input
          ref={ref}
          id={inputId}
          disabled={disabled}
          required={required}
          aria-invalid={hasError || undefined}
          aria-describedby={describedBy || undefined}
          className={cn(
            // Base
            "w-full",
            "rounded-md border",
            "bg-surface px-3 py-2",
            "font-sans text-base font-normal leading-normal text-text-main",
            "outline-none",
            "transition-all duration-150 ease-out",
            "placeholder:text-text-muted",

            // Default state
            !hasError && "border-border focus:border-primary focus:ring-2 focus:ring-primary/20",

            // Error state
            hasError && "border-danger focus:border-danger focus:ring-2 focus:ring-danger/20",

            // Disabled state
            disabled && "cursor-not-allowed bg-surface-muted text-text-muted opacity-70",

            className,
          )}
          {...props}
        />

        {description && (
          <p id={descriptionId} className="text-xs leading-normal text-text-muted">
            {description}
          </p>
        )}

        {hasError && (
          <p id={errorId} role="alert" className="text-xs font-medium leading-normal text-danger">
            {error}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
