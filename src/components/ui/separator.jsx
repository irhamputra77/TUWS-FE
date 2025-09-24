import { cn } from "../../lib/utils";

export function Separator({ className, orientation = "horizontal", ...props }) {
    const base = orientation === "vertical" ? "h-full w-px" : "h-px w-full";
    return <div role="separator" aria-orientation={orientation} className={cn(base, "bg-slate-200 dark:bg-white/10", className)} {...props} />;
}