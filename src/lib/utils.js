// src/lib/utils.jsx
import { twMerge } from "tailwind-merge";
import clsx from "clsx";

export function cn(...inputs) {
    return twMerge(clsx(inputs));
}
