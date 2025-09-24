// src/components/ui/card.jsx
import React from "react";
import { cn } from "../../lib/utils";

export function Card({ className, ...props }) {
    return (
        <div
            className={cn(
                "rounded-3xl border border-white/30 bg-white/10 p-4",
                "shadow-md backdrop-blur-sm",
                className
            )}
            {...props}
        />
    );
}


export function CardHeader({ className, ...props }) { return <div className={cn("p-2 pb-0", className)} {...props} />; }
export function CardTitle({ className, ...props }) {
    return (
        <h3 className={cn("text-lg font-semibold leading-none tracking-tight text-slate-800 dark:text-slate-100", className)} {...props} />
    );
}
export function CardContent({ className, ...props }) { return <div className={cn("p-2 pt-0", className)} {...props} />; }
export function CardFooter({ className, ...props }) { return <div className={cn("p-2 pt-0", className)} {...props} />; }