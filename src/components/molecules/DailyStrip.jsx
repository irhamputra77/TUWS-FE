import { useRef } from "react";
import { Cloud } from "lucide-react";
import iconMap from "../weather/shared/iconMap";   // <— UBAH path ke shared

export default function DailyStrip({ items }) {
    const scrollRef = useRef(null);
    const isDown = useRef(false);
    const startX = useRef(0);
    const scrollLeft = useRef(0);

    const handleMouseDown = (e) => {
        isDown.current = true;
        startX.current = e.pageX - scrollRef.current.offsetLeft;
        scrollLeft.current = scrollRef.current.scrollLeft;
    };
    const handleMouseLeave = () => (isDown.current = false);
    const handleMouseUp = () => (isDown.current = false);
    const handleMouseMove = (e) => {
        if (!isDown.current) return;
        e.preventDefault();
        const x = e.pageX - scrollRef.current.offsetLeft;
        const walk = (x - startX.current) * 1.2;
        scrollRef.current.scrollLeft = scrollLeft.current - walk;
    };

    return (
        <div
            ref={scrollRef}
            style={{ touchAction: "pan-x" }}
            className="flex overflow-x-auto no-scrollbar text-white cursor-grab active:cursor-grabbing select-none items-stretch gap-3 md:gap-0 pb-1"
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
        >
            {items.map((d) => {
                const Icon = iconMap[d.icon] || Cloud;
                return (
                    <div
                        key={d.d}
                        className="relative shrink-0 text-center min-w-[120px] md:min-w-[170px] my-1 md:my-2 px-3 py-2 md:px-3 md:py-3 rounded-[16px] md:rounded-[22px] bg-white/10 md:bg-white/10 border border-white/20 md:border-white/30 flex flex-col items-center justify-center"
                    >
                        <div className="text-[12px] md:text-[18px] font-medium">{d.d}</div>
                        <div className="text-[11px] md:text-[14px] opacity-90 -mt-0.5">{d.date}</div>
                        <div className="mt-1 text-[28px] md:text-[40px] font-bold leading-none">
                            {d.temp}°
                        </div>
                        <Icon className="mt-1 h-5 w-5 md:h-6 md:w-6" />
                    </div>
                );
            })}
        </div>
    );
}
