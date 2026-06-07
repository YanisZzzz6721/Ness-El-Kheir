import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className, hover = true }: CardProps) {
  return (
    <div
      className={cn(
        "bg-white rounded-[10px] shadow-md overflow-hidden",
        hover && "transition-all duration-300 hover:-translate-y-1 hover:shadow-lg",
        className
      )}
    >
      {children}
    </div>
  );
}
