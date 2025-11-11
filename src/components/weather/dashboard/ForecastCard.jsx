import HourlyStrip from "./HourlyStrip";

export default function ForecastCard({ view, hourly, current, className }) {
    return (
        <section
            className={`rounded-[22px] md:rounded-3xl border border-white/30 bg-white/10 backdrop-blur-xl shadow-xl px-3 py-3 md:px-0 md:py-0 ${className || ""
                }`}
        >
            <section className="md:p-3">
                {view === "hourly" ? (
                    <HourlyStrip current={current} items={hourly} />
                ) : (
                    <HourlyStrip current={current} items={hourly} />
                )}
            </section>
        </section>
    );
}
