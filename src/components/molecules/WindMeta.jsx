export default function WindMeta({ speed, unit = "km/j" }) {
    return (
        <div className="flex gap-2">
            <span className="text-[36px] font-extrabold leading-none tabular-nums">{speed}</span>
            <div className="flex flex-col">
                <span className="text-[13px] font-medium opacity-90">Kecepatan</span>
                <span className="text-[13px] font-medium opacity-90">{unit}</span>
            </div>
        </div>
    );
}
