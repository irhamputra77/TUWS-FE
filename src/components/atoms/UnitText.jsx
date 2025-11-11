export default function UnitText({ value, unit, valueClass = "font-extrabold", unitClass = "font-semibold opacity-80 text-[12px]" }) {
    return (
        <span className="inline-flex items-baseline gap-1 tabular-nums whitespace-nowrap">
            <span className={valueClass}>{value}</span>
            <span className={unitClass}>{unit}</span>
        </span>
    );
}
