import {
  ChangeEvent,
  forwardRef,
  InputHTMLAttributes,
  useCallback,
  useRef,
  useState,
} from "react";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  /** ラベルテキスト */
  label: string;
  /** バリデーションエラーメッセージ */
  error?: string;
  /** ヒント／補足テキスト */
  hint?: string;
  /** 変更ハンドラ — 前後空白はトリムして渡す */
  onChange?: (trimmedValue: string, event: ChangeEvent<HTMLInputElement>) => void;
}

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      hint,
      id,
      className = "",
      onChange,
      disabled,
      required,
      ...props
    },
    ref,
  ) => {
    // Generate stable id if not provided
    const generatedId = useRef(
      `input-${Math.random().toString(36).slice(2, 9)}`,
    ).current;
    const inputId   = id ?? generatedId;
    const errorId   = `${inputId}-error`;
    const hintId    = `${inputId}-hint`;

    const hasError = Boolean(error);

    const handleChange = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        // 前後空白をトリムして親へ渡す
        const trimmed = e.target.value.trim();
        onChange?.(trimmed, e);
      },
      [onChange],
    );

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {/* Label */}
        <label
          htmlFor={inputId}
          className={[
            "text-caption font-semibold leading-[1.43]",
            disabled
              ? "text-warm-500 cursor-not-allowed"
              : "text-[rgba(0,0,0,0.95)]",
          ].join(" ")}
        >
          {label}
          {required && (
            <span
              aria-hidden="true"
              className="ml-1 text-orange"
            >
              *
            </span>
          )}
        </label>

        {/* Input field */}
        <input
          ref={ref}
          id={inputId}
          disabled={disabled}
          required={required}
          aria-invalid={hasError}
          aria-describedby={
            [hasError && errorId, hint && hintId].filter(Boolean).join(" ") ||
            undefined
          }
          onChange={handleChange}
          className={[
            // Base
            "w-full font-sans text-body font-normal",
            "px-3 py-2 rounded-micro",
            "outline-none",
            "transition-all duration-[160ms] ease-[cubic-bezier(0.25,0.1,0.25,1)]",
            "placeholder:text-warm-500",
            // Border states
            hasError
              ? "border border-orange focus:ring-2 focus:ring-orange/30 text-[rgba(0,0,0,0.95)] bg-white"
              : "border border-[rgba(0,0,0,0.15)] focus:border-focus focus:ring-2 focus:ring-focus/20 bg-white",
            // Disabled
            disabled
              ? "opacity-50 cursor-not-allowed bg-warm-100 text-warm-500"
              : "text-[rgba(0,0,0,0.95)]",
            className,
          ]
            .filter(Boolean)
            .join(" ")}
          {...props}
        />

        {/* Error message */}
        {hasError && (
          <p
            id={errorId}
            role="alert"
            className="text-micro text-orange font-medium leading-[1.33]"
          >
            {error}
          </p>
        )}

        {/* Hint text (non-error) */}
        {!hasError && hint && (
          <p
            id={hintId}
            className="text-micro text-warm-700 leading-[1.33]"
          >
            {hint}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

// ─────────────────────────────────────────────────────────────────────────────
// Hook: useInputTrim
// フォーム submit 時に全フィールドを一括トリムするユーティリティ
// ─────────────────────────────────────────────────────────────────────────────

/**
 * テキスト入力値の前後空白をトリムするフック。
 *
 * @example
 * const { value, onChange, trimmedValue } = useInputTrim("");
 * <Input label="回答" value={value} onChange={(v) => onChange(v)} />
 */
export function useInputTrim(initialValue = "") {
  const [value, setValue] = useState(initialValue);

  const onChange = useCallback((trimmed: string) => {
    setValue(trimmed);
  }, []);

  return {
    value,
    /** Input の onChange に渡す（既にトリム済み値が届く） */
    onChange,
    /** 現在の値（trim済み） */
    trimmedValue: value.trim(),
    /** フィールドをリセット */
    reset: () => setValue(initialValue),
  } as const;
}