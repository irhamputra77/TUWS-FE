export default function WeatherHeader({ place, time }) {
    return (
        <header>
            <section className="flex items-center justify-between text-white">
                <div className="flex items-center gap-3s">
                    <span className="uppercase tracking-wide font-extrabold text-[16px]">{place}</span>
                    <span className="hidden md:block md:h-px md:w-5 md:mt-4 md:bg-white/70 md:mb-4 md:mx-3" />
                    <span className="font-semibold opacity-90 text-[18px]">{(time || "").replace(":", ".")}</span>
                </div>
            </section>
        </header>
    );
}
