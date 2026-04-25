import { HTMLAttributes } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export type BadgeStatus =
  | "published"   // 公開
  | "draft"       // 下書き
  | "private"     // 非公開
  | "suspended";  // 停止

export type BadgeVariant =
  | BadgeStatus
  | "new"
  | "info"
  | "warning"
  | "danger";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** バッジのバリアント */
  variant: BadgeVariant;
  /** 表示テキスト（省略時はvariantに対応したデフォルトラベルを使用） */
  label?: string;
  /** ステータスドット（左側の小さな円）を表示 */
  dot?: boolean;
}

// ─────────────────────────────────────────────────────────────────────────────
// Config
// ─────────────────────────────────────────────────────────────────────────────

interface BadgeConfig {
  label:   string;
  dot:     string;  // dot color class
  bg:      string;
  text:    string;
  border:  string;
}

const badgeConfig: Record<BadgeVariant, BadgeConfig> = {
  // ── ステータス ──────────────────────────────────────────
  published: {
    label:  "公開",
    dot:    "bg-green",
    bg:     "bg-[#f0fdf4]",
    text:   "text-[#166534]",
    border: "border-[#bbf7d0]",
  },
  draft: {
    label:  "下書き",
    dot:    "bg-warm-400",
    bg:     "bg-warm-100",
    text:   "text-warm-700",
    border: "border-warm-300",
  },
  private: {
    label:  "非公開",
    dot:    "bg-warm-500",
    bg:     "bg-warm-50",
    text:   "text-warm-700",
    border: "border-warm-200",
  },
  suspended: {
    label:  "停止",
    dot:    "bg-orange",
    bg:     "bg-[#fff4ed]",
    text:   "text-orange",
    border: "border-[#fcd8b2]",
  },

  // ── 汎用 ──────────────────────────────────────────────
  new: {
    label:  "NEW",
    dot:    "bg-notion-blue",
    bg:     "bg-badge-bg",
    text:   "text-badge-text",
    border: "border-[#c0dff8]",
  },
  info: {
    label:  "情報",
    dot:    "bg-notion-blue",
    bg:     "bg-badge-bg",
    text:   "text-badge-text",
    border: "border-[#c0dff8]",
  },
  warning: {
    label:  "注意",
    dot:    "bg-riddle-gold",
    bg:     "bg-riddle-gold-bg",
    text:   "text-riddle-gold",
    border: "border-[#f3d7a0]",
  },
  danger: {
    label:  "危険",
    dot:    "bg-orange",
    bg:     "bg-[#fff4ed]",
    text:   "text-orange",
    border: "border-[#fcd8b2]",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────

export function Badge({
  variant,
  label,
  dot    = false,
  className = "",
  ...props
}: BadgeProps) {
  const cfg       = badgeConfig[variant];
  const displayLabel = label ?? cfg.label;

  return (
    <span
      role="status"
      aria-label={displayLabel}
      className={[
        // Pill shape
        "inline-flex items-center gap-1",
        "px-2 py-0.75",
        "rounded-full border",
        // Micro text — badge scale
        "text-badge font-semibold leading-[1.33] tracking-[0.125px]",
        "whitespace-nowrap select-none",
        // Colors from config
        cfg.bg,
        cfg.text,
        cfg.border,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {/* Status dot */}
      {dot && (
        <span
          aria-hidden="true"
          className={[
            "inline-block w-1.5 h-1.5 rounded-full shrink-0",
            cfg.dot,
          ].join(" ")}
        />
      )}
      {displayLabel}
    </span>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Convenience wrappers (画面仕様書 P-05 の4ステータス)
// ─────────────────────────────────────────────────────────────────────────────

export const PublishedBadge  = (props: Omit<BadgeProps, "variant">) => <Badge variant="published"  dot {...props} />;
export const DraftBadge      = (props: Omit<BadgeProps, "variant">) => <Badge variant="draft"      dot {...props} />;
export const PrivateBadge    = (props: Omit<BadgeProps, "variant">) => <Badge variant="private"    dot {...props} />;
export const SuspendedBadge  = (props: Omit<BadgeProps, "variant">) => <Badge variant="suspended" dot {...props} />;