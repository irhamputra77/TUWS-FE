import { degToArah } from "../weather/shared";
import { Compass } from "../molecules";
import WindMeta from "../molecules/WindMeta";

export default function WindCompassPanel({ speed, deg }) {
    return (
        <div className="col-span-4 h-full rounded-[28px] border border-white/30 bg-white/10 backdrop-blur-xl shadow-xl p-5 flex flex-col">
            <div className="flex items-center justify-between text-white">
                <div className="flex items-center gap-2">
                    <span className="text-[28px] font-semibold">Angin</span>
                </div>
                <WindMeta speed={speed} />
            </div>
            <div className="mt-3 flex-1 flex items-center justify-center">
                <Compass deg={deg} />
            </div>
            <div className="mt-3 text-center text-white text-lg font-extrabold">
                {degToArah(deg)}
            </div>
        </div>
    );
}
