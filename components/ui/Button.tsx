import { twMerge } from "tailwind-merge";
import clsx from "clsx";

interface ButtonProps {
  size?: "small" | "medium" | "large";
  variant?: "primary" | "secondary";
  label: string;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
}

// 재사용 가능한 버튼 컴포넌트
export function Button({
  size = "large",
  variant = "primary",
  label,
  type = "button",
  disabled = false,
  onClick,
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={twMerge(
        clsx(
          "flex items-center justify-center text-center py-3 px-4 rounded-sm focus:outline-none focus:ring-2 focus:ring-theme focus:ring-offset-2 hover:opacity-80 transition-opacity",
          variant === "primary" && "bg-theme text-white",
          variant === "secondary" && "bg-secondary text-black",
          size === "small" && "w-20",
          size === "medium" && "w-32",
          size === "large" && "w-full",
          disabled && "cursor-default text-gray-400 hover:opacity-100",
        ),
      )}
    >
      {label}
    </button>
  );
}
