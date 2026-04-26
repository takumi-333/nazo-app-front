import { ButtonHTMLAttributes, forwardRef } from "react";
import { Button } from "@/app/components/ui/Button";

type TopActionButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  variant?: TopActionButtonVariant;
};

type TopActionButtonVariant = "create" | "play";

const topActionButtonStyles: Record<TopActionButtonVariant, string> = {
  create:
    "bg-[#1aae39] hover:bg-[#17a034] text-white border-[#1aae39]",
  play:
    "bg-[#dd5b00] hover:bg-[#c75200] text-white border-[#dd5b00]",
};


export const TopActionButton = forwardRef<
  HTMLButtonElement,
  TopActionButtonProps
>(({ children, className = "", variant = "create", ...props }, ref) => {
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
        "shadow-card hover:shadow-card-hover",
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
});

TopActionButton.displayName = "TopActionButton";