export default function SocialLink({ icon: Icon, title, primary, secondary, href }) {
    const Comp = href ? "a" : "div";
    return (
        <Comp
            {...(href ? { href, target: "_blank", rel: "noopener noreferrer" } : {})}
            className="flex items-center gap-3 rounded-xl bg-white/80 hover:bg-white transition p-4 ring-1 ring-black/5 shadow-sm"
        >
            {Icon && <Icon className="w-5 h-5 text-slate-700" />}
            <div className="min-w-0">
                <div className="text-xs text-slate-500">{title}</div>
                <div className="font-medium text-slate-900 truncate">{primary}</div>
                {secondary && <div className="text-sm text-slate-600 truncate">{secondary}</div>}
            </div>
        </Comp>
    );
}
