import { Compass as CompassIcon } from "lucide-react";
import Cardinal from "./Cardinal";

export default function Compass({ deg = 100 }) {
    return (
        <div className="relative mx-auto aspect-square w-32 sm:w-40 md:w-48 select-none">
            <div className="absolute inset-0 rounded-full border-2 border-white/80 bg-white/10 backdrop-blur" />
            <div className="absolute inset-2 rounded-full border border-white/70" />

            <div className="absolute inset-0 grid place-items-center">
                <div className="relative h-[72%] w-[72%] rounded-full border border-white/70">
                    <CompassIcon className="absolute left-1/2 top-1/2 h-20 w-20 sm:h-24 sm:w-24 md:h-28 md:w-28 -translate-x-1/2 -translate-y-1/2 opacity-30 text-white" />
                    <Cardinal label="N" className="-top-5.5 left-1/2 -translate-x-1/2 text-white/90 drop-shadow text-[16px]" />
                    <Cardinal label="E" className="top-1/2 -right-3.5 -translate-y-1/2 text-white/90 drop-shadow text-[16px]" />
                    <Cardinal label="S" className="-bottom-5 left-1/2 -translate-x-1/2 text-white/90 drop-shadow text-[16px]" />
                    <Cardinal label="W" className="top-1/2 -left-4.5 -translate-y-1/2 text-white/90 drop-shadow text-[16px]" />

                    {/* jarum */}
                    <div
                        className="absolute left-1/2 bottom-0.5 h-12 sm:h-14 md:h-16 w-[4px] -translate-x-1/2 -translate-y-[103%] origin-bottom rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,.8)]"
                        style={{ rotate: `${deg}deg` }}
                    />
                    <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white" />
                </div>
            </div>
        </div>
    );
}
