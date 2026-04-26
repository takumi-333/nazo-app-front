import { forwardRef, HTMLAttributes, ImgHTMLAttributes, ReactNode } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** ホバーエフェクト有効化（デフォルト: false） */
  hoverable?: boolean;
  /** クリック可能なカード（cursor-pointer + focus ring） */
  clickable?: boolean;
  /** 追加クラス */
  className?: string;
  children: ReactNode;
}

// ─────────────────────────────────────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────────────────────────────────────

/** カード内の謎画像エリア */
export function CardImage({
  src,
  alt,
  className = "",
  ...props
}: ImgHTMLAttributes<HTMLImageElement> & { alt: string }) {
  return (
    <div className="overflow-hidden rounded-t-[11px] -mx-px -mt-px">
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className={[
          "w-full object-cover aspect-[4/3]",
          "border-b border-[rgba(0,0,0,0.1)]",
          className,
        ].join(" ")}
        {...props}
      />
    </div>
  );
}

/** カードのコンテンツ領域 */
export function CardBody({ children, className = "", ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`p-6 flex flex-col gap-3 ${className}`} {...props}>
      {children}
    </div>
  );
}

/** カードタイトル */
export function CardTitle({
  children,
  className = "",
  ...props
}: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={[
        "text-card-title font-bold text-[rgba(0,0,0,0.95)]",
        "leading-[1.27] tracking-[-0.25px]",
        "line-clamp-2",
        className,
      ].join(" ")}
      {...props}
    >
      {children}
    </h3>
  );
}

/** カードのメタ情報（プレイ数・評価など） */
export function CardMeta({ children, className = "", ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`flex items-center gap-3 flex-wrap ${className}`} {...props}>
      {children}
    </div>
  );
}

/** カードのメタアイテム（個別の統計） */
export function CardMetaItem({
  icon,
  label,
  className = "",
}: {
  icon?: ReactNode;
  label: string;
  className?: string;
}) {
  return (
    <span
      className={[
        "inline-flex items-center gap-1",
        "text-micro font-medium text-warm-700",
        "leading-[1.33]",
        className,
      ].join(" ")}
    >
      {icon && <span aria-hidden="true">{icon}</span>}
      {label}
    </span>
  );
}

/** カードのフッター（アクションボタンなど） */
export function CardFooter({ children, className = "", ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={[
        "px-6 py-4",
        "border-t border-[rgba(0,0,0,0.07)]",
        "flex items-center gap-2",
        className,
      ].join(" ")}
      {...props}
    >
      {children}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main Card component
// ─────────────────────────────────────────────────────────────────────────────

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ hoverable = false, clickable = false, className = "", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role={clickable ? "button" : undefined}
        tabIndex={clickable ? 0 : undefined}
        className={[
          // Base card
          "relative flex flex-col",
          "bg-white",
          "border border-[rgba(0,0,0,0.1)]",
          "rounded-[12px]",
          // 4-layer soft shadow
          "[box-shadow:rgba(0,0,0,0.04)_0px_4px_18px,rgba(0,0,0,0.027)_0px_2.025px_7.85px,rgba(0,0,0,0.02)_0px_0.8px_2.93px,rgba(0,0,0,0.01)_0px_0.175px_1.04px]",
          "overflow-hidden",
          "transition-all duration-[160ms] ease-[cubic-bezier(0.25,0.1,0.25,1)]",
          // Hover state
          hoverable
            ? "[&:hover]:[box-shadow:rgba(0,0,0,0.07)_0px_6px_24px,rgba(0,0,0,0.045)_0px_3px_10px,rgba(0,0,0,0.03)_0px_1px_4px,rgba(0,0,0,0.015)_0px_0.25px_1.5px] [&:hover]:-translate-y-0.5"
            : "",
          // Clickable
          clickable
            ? "cursor-pointer focus-visible:ring-2 focus-visible:ring-focus outline-none"
            : "",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...props}
      >
        {children}
      </div>
    );
  },
);

Card.displayName = "Card";
