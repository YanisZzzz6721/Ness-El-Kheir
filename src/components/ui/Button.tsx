"use client";

import { cn } from "@/lib/utils";
import { type ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    const base =
      "inline-flex items-center justify-center gap-2 font-semibold rounded-full border-2 transition-all duration-200 cursor-pointer whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

    const variants = {
      primary:
        "bg-[#839678] text-white border-[#839678] hover:bg-[#6b7d63] hover:border-[#6b7d63] hover:-translate-y-px hover:shadow-md active:translate-y-0",
      outline:
        "bg-transparent text-[#839678] border-[#839678] hover:bg-[#839678] hover:text-white hover:-translate-y-px active:translate-y-0",
      ghost:
        "bg-transparent text-[#4a4a4a] border-transparent hover:bg-[#f0f3ee] hover:text-[#839678] active:translate-y-0",
    };

    const sizes = {
      sm: "text-xs px-4 py-2",
      md: "text-sm px-6 py-3",
      lg: "text-base px-8 py-3.5",
    };

    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
