import { cn } from "@/lib/utils";

interface SectionTitleProps {
  label?: string;         // petit texte vert au-dessus : "À propos"
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
  titleClassName?: string;
}

export default function SectionTitle({
  label,
  title,
  subtitle,
  align = "center",
  className,
  titleClassName,
}: SectionTitleProps) {
  return (
    <div className={cn("flex flex-col gap-3", align === "center" ? "items-center text-center" : "items-start text-left", className)}>
      {label && (
        <span className="section-label">{label}</span>
      )}
      <h2 className={cn("text-[#1c1c1c]", titleClassName)}>{title}</h2>
      {subtitle && (
        <p className="max-w-2xl text-[#4a4a4a] text-base leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
