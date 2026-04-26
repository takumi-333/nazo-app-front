import { ButtonHTMLAttributes, forwardRef } from "react";
import { Button } from "@/components/ui/Button";

type TopActionButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  variant?: TopActionButtonVariant;
};

type TopActionButtonVariant = "create" | "play";

const topActionButtonStyles: Record<TopActionButtonVariant, string> = {
  create: "bg-action-create hover:bg-action-create-hover text-white",
  play: "bg-action-play hover:bg-action-play-hover text-white",
};

export const TopActionButton = forwardRef<HTMLButtonElement, TopActionButtonProps>(
  ({ children, className = "", variant = "create", ...props }, ref) => {
    return (
      <Button
        ref={ref}
        variant="custom"
        size="lg"
        className={[
          "h-[160px] w-[160px]",
          "sm:h-[180px] sm:w-[180px]",
          "flex-col rounded-lg",
          "text-card-title",
          "shadow-soft hover:shadow-soft-hover",
          "hover:scale-[1.02]",
          topActionButtonStyles[variant],
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...props}
      >
        {children}
      </Button>
    );
  },
);

TopActionButton.displayName = "TopActionButton";
