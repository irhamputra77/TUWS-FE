import { useRef } from "react";
import { Cloud, CloudSun } from "lucide-react";
import iconMap from "../weather/shared/iconMap";

export default function ForecastCard({
    view = "hourly",
    hourly = [],
    daily = [],
    current = {},
    className = "",
}) {
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

    // ========== HOURLY STRIP ==========
    if (view === "hourly") {
        return (
            <section
                className={`rounded-[22px] md:rounded-3xl border border-white/30 bg-white/10 backdrop-blur-xl shadow-xl px-3 py-3 md:px-0 md:py-0 ${className}`}
            >
                <div
                    ref={scrollRef}
                    style={{ touchAction: "pan-x" }}
                    className="flex overflow-x-auto no-scrollbar text-white cursor-grab active:cursor-grabbing select-none items-stretch gap-3 md:gap-0 p-2"
                    onMouseDown={handleMouseDown}
                    onMouseLeave={handleMouseLeave}
                    onMouseUp={handleMouseUp}
                    onMouseMove={handleMouseMove}
                >
                    {/* Tile SEKARANG */}
                    <div className="relative shrink-0 min-w-[132px] md:min-w-[178px] min-h-[172px] md:min-h-[241px] rounded-[20px] md:rounded-[32px] bg-white/85 text-[#5c5c5c] px-3 py-3 md:px-0 md:py-0 flex flex-col items-center justify-center">
                        <div className="text-[14px] md:text-[20px] font-bold opacity-95 md:pb-[30px]">Sekarang</div>
                        <div className="mt-0 md:mt-1 text-[36px] md:text-[48px] font-extrabold leading-none md:pb-[33px]">
                            {(current?.temp ?? "—")}°
                        </div>
                        <CloudSun className="h-8 w-8 md:h-[60px] md:w-[60px]" />
                    </div>

                    {/* Item jam berikutnya */}
                    {hourly.map((h) => {
                        const Icon = (h?.icon && iconMap[h.icon]) || Cloud;
                        const key = h?.t ?? h?.time ?? JSON.stringify(h);
                        return (
                            <div
                                key={key}
                                className="relative shrink-0 text-center min-w-[100px] md:min-w-[178px] my-1 md:my-2 py-2 md:py-3 flex flex-col items-center justify-center"
                            >
                                <div className="text-[12px] md:text-[20px] font-bold opacity-95 md:pb-[30px]">
                                    {h?.t ?? h?.time ?? "—"}
                                </div>
                                <div className="mt-0.5 md:mt-1 text-[28px] md:text-[48px] font-extrabold leading-none md:pb-[33px]">
                                    {(h?.temp ?? "—")}°
                                </div>
                                <Icon className="h-6 w-6 md:h-[60px] md:w-[60px]" />
                            </div>
                        );
                    })}
                </div>
            </section>
        );
    }

    // ========== DAILY STRIP (horizontal, seragam) ==========
    return (
        <section
            className={`rounded-[22px] md:rounded-3xl border border-white/30 bg-white/10 backdrop-blur-xl shadow-xl px-3 py-3 md:px-0 md:py-0 ${className}`}
        >
            <div
                ref={scrollRef}
                style={{ touchAction: "pan-x" }}
                className="flex overflow-x-auto no-scrollbar text-white cursor-grab active:cursor-grabbing select-none items-stretch gap-3 md:gap-0 p-2"
                onMouseDown={handleMouseDown}
                onMouseLeave={handleMouseLeave}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
            >
                {daily.map((d) => {
                    const Icon = (d?.icon && iconMap[d.icon]) || Cloud;
                    const key = d?.d ?? d?.date ?? JSON.stringify(d);
                    return (
                        <div
                            key={key}
                            className="relative shrink-0 text-center min-w-[132px] md:min-w-[178px] my-1 md:my-2 py-2 md:py-3 flex flex-col items-center justify-center"
                        >
                            <div className="text-[12px] md:text-[20px] font-bold opacity-95 md:pb-[22px]">
                                {d?.d ?? d?.date ?? "—"}
                            </div>
                            <Icon className="h-6 w-6 md:h-[54px] md:w-[54px]" />
                            <div className="mt-2 md:mt-3 text-[18px] md:text-[22px] font-extrabold leading-none">
                                {(d?.min ?? "—")}° / {(d?.max ?? "—")}°
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
