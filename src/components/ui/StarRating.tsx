"use client";
import { KeyboardEvent, useCallback, useState } from "react";

export type StarValue = 1 | 2 | 3 | 4 | 5;

export interface StarRatingProps {
  value?: StarValue | null;
  onSelect?: (value: StarValue) => void;
  label?: string;
  disabled?: boolean;
  locked?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const STAR_LABELS: Record<StarValue, string> = {
  1: "とても面白くなかった",
  2: "面白くなかった",
  3: "普通",
  4: "面白かった",
  5: "とても面白かった",
};

const sizeMap = {
  sm: { star: 18, px: "px-2 py-1.5" },
  md: { star: 24, px: "px-3 py-2" },
  lg: { star: 30, px: "px-4 py-2.5" },
};

function StarIcon({ filled, size }: { filled: boolean; size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={filled ? "0" : "1.8"}
      aria-hidden="true"
      className="transition-all duration-150"
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

export function StarRating({
  value,
  onSelect,
  label = "この謎を評価してください",
  disabled = false,
  locked = false,
  size = "md",
  className = "",
}: StarRatingProps) {
  const [hoverIndex, setHoverIndex] = useState(0);
  const isInteractive = !disabled && !locked;
  const { star: starSize, px } = sizeMap[size];

  const handleSelect = useCallback(
    (star: StarValue) => {
      if (!isInteractive) return;
      onSelect?.(star);
    },
    [isInteractive, onSelect],
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLButtonElement>, star: StarValue) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleSelect(star);
      }
    },
    [handleSelect],
  );

  return (
    <fieldset className={`border-none p-0 m-0 ${className}`} aria-disabled={disabled}>
      <legend className="text-sm font-semibold text-foreground mb-3">
        {label}
        {!locked && !disabled && (
          <span className="ml-2 text-xs text-muted-foreground font-normal">タップして送信</span>
        )}
      </legend>

      <div
        className="flex items-center gap-2"
        role="group"
        aria-label={label}
        onMouseLeave={() => setHoverIndex(0)}
      >
        {([1, 2, 3, 4, 5] as StarValue[]).map((star) => {
          const isFilled = (value != null && star <= value) || (isInteractive && star <= hoverIndex);
          const isSelected = value === star;

          return (
            <button
              key={star}
              type="button"
              aria-label={`${star}星: ${STAR_LABELS[star]}`}
              aria-pressed={isSelected}
              disabled={!isInteractive}
              onMouseEnter={() => isInteractive && setHoverIndex(star)}
              onClick={() => handleSelect(star)}
              onKeyDown={(e) => handleKeyDown(e, star)}
              className={[
                // ボタン形状
                "flex items-center justify-center rounded-lg border transition-all duration-150",
                px,
                "outline-none focus-visible:ring-2 focus-visible:ring-ring",
                // インタラクティブ時
                isInteractive
                  ? "cursor-pointer active:scale-95"
                  : "cursor-default",
                // 選択・ホバー状態
                isFilled
                  ? "bg-amber-50 border-amber-300 text-amber-500 shadow-sm"
                  : "bg-muted/50 border-border text-muted-foreground hover:border-amber-300 hover:bg-amber-50/50",
                // 選択済みは少し強調
                isSelected ? "ring-1 ring-amber-400 scale-105" : "",
                // ロック時は選択星だけ残す
                locked && !isSelected ? "opacity-40" : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <StarIcon filled={isFilled} size={starSize} />
            </button>
          );
        })}
      </div>

      {/* 選択中ラベル */}
      {value != null && (
        <p className="mt-2 text-xs text-muted-foreground animate-in fade-in">
          {value}星: {STAR_LABELS[value]}
          {locked && " — 送信済み"}
        </p>
      )}
    </fieldset>
  );
}