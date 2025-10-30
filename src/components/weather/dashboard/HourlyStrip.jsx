import { useRef } from "react";
import { Cloud, CloudSun } from "lucide-react";
import iconMap from "../shared/iconMap";   // <— UBAH path ke shared

export default function HourlyStrip({ current, items }) {
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
            {/* Tile SEKARANG */}
            <div className="relative shrink-0 min-w-[132px] md:min-w-[178px] min-h-[172px] md:min-h-[241px] rounded-[20px] md:rounded-[32px] bg-white/85 text-[#5c5c5c] px-3 py-3 md:px-0 md:py-0 flex flex-col items-center justify-center">
                <div className="text-[14px] md:text-[20px] font-bold opacity-95 md:pb-[30px]">Sekarang</div>
                <div className="mt-0 md:mt-1 text-[36px] md:text-[48px] font-extrabold leading-none md:pb-[33px]">
                    {current.temp}°
                </div>
                <CloudSun className="h-8 w-8 md:h-[60px] md:w-[60px]" />
            </div>

            {/* Item jam berikutnya */}
            {items.map((h) => {
                const Icon = iconMap[h.icon] || Cloud;
                return (
                    <div
                        key={h.t}
                        className="relative shrink-0 text-center min-w-[100px] md:min-w-[178px] my-1 md:my-2 py-2 md:py-3 flex flex-col items-center justify-center"
                    >
                        <div className="text-[12px] md:text-[20px] font-bold opacity-95 md:pb-[30px]">{h.t}</div>
                        <div className="mt-0.5 md:mt-1 text-[28px] md:text-[48px] font-extrabold leading-none md:pb-[33px]">
                            {h.temp}°
                        </div>
                        <Icon className="h-6 w-6 md:h-[60px] md:w-[60px]" />
                    </div>
                );
            })}
        </div>
    );
}
