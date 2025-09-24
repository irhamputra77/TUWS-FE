import { cn } from "../../lib/utils";

export function Badge({ className, ...props }) {
    return (
        <div
            className={cn(
                "inline-flex items-center rounded-full border border-white/50 px-2.5 py-0.5",
                "text-xs font-medium text-slate-700 dark:text-slate-200",
                "bg-white/70 backdrop-blur dark:bg-white/10",
                className
            )}
            {...props}
        />
    );
}