import Surface from "../atoms/Surface";
import PARAMS from "../weather/detail/paramDefs";

export default function RightSummary({ paramKey, stats }) {
    const p = PARAMS.find(x => x.key === paramKey) ?? PARAMS[0];
    const unit = p.unit;
    const title = p.label;

    const Block = ({ lbl, val }) => (
        <div className="mb-3 last:mb-0">
            <div className="text-sm opacity-90">{lbl}</div>
            <div className="text-3xl font-extrabold">
                {val}
                {unit && <span className="ml-1">{unit}</span>}
            </div>
        </div>
    );

    return (
        <Surface variant="glass" className="rounded-[18px] text-white">
            <Block lbl={`${title} Tertinggi :`} val={stats.max} />
            <Block lbl={`${title} Terendah :`} val={stats.min} />
            <Block lbl={`${title} Rata-Rata :`} val={stats.avg} />
        </Surface>
    );
}
