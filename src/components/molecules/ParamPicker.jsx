import Surface from "../atoms/surface";
import PARAMS from "../weather/detail/paramDefs"; // sesuaikan jika beda path

export default function ParamPicker({ value, onChange, options }) {
    const opts = options ?? PARAMS;
    const opt = opts.find(p => p.key === value) ?? opts[0];
    const Icon = opt?.icon;

    return (
        <Surface
            variant="glass"
            className="inline-flex items-center gap-2 rounded-[14px] px-3 py-2 mb-5 text-white"
        >
            {Icon && <Icon className="h-4 w-4" />}
            <div className="relative ml-1">
                <select
                    aria-label="Pilih parameter"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="appearance-none bg-transparent pr-6 text-sm font-semibold outline-none"
                >
                    {opts.map(p => (
                        <option key={p.key} value={p.key} className="bg-white text-slate-900">
                            {p.label}
                        </option>
                    ))}
                </select>
                <span className="pointer-events-none absolute right-0 top-0.5 text-white/90">▾</span>
            </div>
        </Surface>
    );
}
