import Surface from "../atoms/surface";
import IconCircle from "../atoms/IconCircle";

export default function MetricCard({ icon: Icon, label, value, unit }) {
    return (
        <Surface variant="glass" className="rounded-[18px] px-5 py-4 text-white">
            <div className="flex items-center gap-3">
                <IconCircle icon={Icon} />
                <div className="leading-tight">
                    <div className="text-[14px] opacity-90 ">{label}</div>
                    <div className="text-[22px] font-extrabold tabular-nums">
                        {value}
                        {unit ? (
                            <span className="ml-1 opacity-95 font-bold text-[14px]">{unit}</span>
                        ) : null}
                    </div>
                </div>
            </div>
        </Surface>
    );
}
