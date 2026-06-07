import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface StatCardProps {
  icon: ReactNode;
  value: string;
  label: string;
  className?: string;
}

export default function StatCard({ icon, value, label, className }: StatCardProps) {
  return (
    <div className={cn(
      "flex flex-col items-center text-center gap-3 bg-white rounded-[10px] p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg",
      className
    )}>
      <div className="w-12 h-12 rounded-full bg-[#f0f3ee] flex items-center justify-center text-[#839678]">
        {icon}
      </div>
      <span className="font-[family-name:var(--font-source-serif)] text-3xl font-semibold text-[#839678] leading-none">
        {value}
      </span>
      <span className="text-sm text-[#8a8a8a] font-medium leading-snug">{label}</span>
    </div>
  );
}
