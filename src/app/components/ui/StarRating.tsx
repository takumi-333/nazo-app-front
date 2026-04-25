"use client";

import { KeyboardEvent, useCallback, useState } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export type StarValue = 1 | 2 | 3 | 4 | 5;

export interface StarRatingProps {
  /** 現在の評価値（controlled） */
  value?: StarValue | null;
  /** 評価変更コールバック */
  onChange?: (value: StarValue) => void;
  /** ラベルテキスト */
  label?: string;
  /** 評価前（未選択）は操作不可 — 外側から渡す */
  disabled?: boolean;
  /** 評価確定後にロック（再選択不可） */
  locked?: boolean;
  /** コンポーネントサイズ */
  size?: "sm" | "md" | "lg";
  /** 追加クラス */
  className?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

const STAR_LABELS: Record<StarValue, string> = {
  1: "1：とても難しかった",
  2: "2：難しかった",
  3: "3：普通",
  4: "4：楽しかった",
  5: "5：とても楽しかった",
};

const sizeMap = {
  sm: { star: 20, gap: "gap-1"   },
  md: { star: 28, gap: "gap-1.5" },
  lg: { star: 36, gap: "gap-2"   },
};

// ─────────────────────────────────────────────────────────────────────────────
// Star icon
// ─────────────────────────────────────────────────────────────────────────────

function StarIcon({
  filled,
  hovered,
  size,
}: {
  filled: boolean;
  hovered: boolean;
  size: number;
}) {
  const active = filled || hovered;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={active ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={active ? "0" : "1.5"}
      aria-hidden="true"
      className="transition-all duration-[160ms]"
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────

export function StarRating({
  value,
  onChange,
  label = "この謎を評価してください",
  disabled = false,
  locked   = false,
  size     = "md",
  className = "",
}: StarRatingProps) {
  const [hoverIndex, setHoverIndex] = useState<number>(0);

  const isInteractive = !disabled && !locked;
  const { star: starSize, gap } = sizeMap[size];

  const handleSelect = useCallback(
    (star: StarValue) => {
      if (!isInteractive) return;
      onChange?.(star);
    },
    [isInteractive, onChange],
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

  const groupId = `star-rating-${label.slice(0, 8).replace(/\s/g, "")}`;

  return (
    <fieldset
      className={`border-none p-0 m-0 ${className}`}
      aria-disabled={disabled}
    >
      <legend className="text-caption font-semibold text-[rgba(0,0,0,0.95)] mb-2">
        {label}
        {!locked && !disabled && (
          <span className="ml-2 text-micro text-warm-500 font-normal">
            （必須）
          </span>
        )}
      </legend>

      <div
        className={`flex items-center ${gap}`}
        role="group"
        aria-label={label}
        onMouseLeave={() => setHoverIndex(0)}
      >
        {([1, 2, 3, 4, 5] as StarValue[]).map((star) => {
          const isFilled  = value != null && star <= value;
          const isHovered = isInteractive && star <= hoverIndex;
          const isSelected = value === star;

          return (
            <button
              key={star}
              type="button"
              aria-label={STAR_LABELS[star]}
              aria-pressed={isSelected}
              disabled={!isInteractive}
              onMouseEnter={() => isInteractive && setHoverIndex(star)}
              onClick={() => handleSelect(star)}
              onKeyDown={(e) => handleKeyDown(e, star)}
              className={[
                "flex items-center justify-center p-0.5 rounded-subtle",
                "outline-none transition-colors duration-[160ms]",
                "focus-visible:ring-2 focus-visible:ring-focus",
                isInteractive
                  ? "cursor-pointer"
                  : "cursor-default",
                // Color: gold when filled/hovered, muted otherwise
                isFilled || isHovered
                  ? "text-riddle-gold"
                  : "text-warm-300",
                // Animate the newly selected star
                isSelected && !disabled
                  ? "animate-star-fill"
                  : "",
                // Scale on hover
                isInteractive && isHovered
                  ? "scale-110"
                  : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <StarIcon
                filled={isFilled}
                hovered={isHovered}
                size={starSize}
              />
            </button>
          );
        })}

        {/* Current selection label */}
        {value != null && (
          <span
            aria-live="polite"
            className="ml-2 text-caption text-warm-700 font-medium animate-fade-in"
          >
            {STAR_LABELS[value]}
          </span>
        )}
      </div>

      {/* Locked badge */}
      {locked && value != null && (
        <p className="mt-1.5 text-micro text-warm-500">
          評価を送信しました
        </p>
      )}
    </fieldset>
  );
}