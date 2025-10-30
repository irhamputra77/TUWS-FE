// components/layouts/WeatherLayout.jsx
import SeamlessBackgroundVideo from "../SeamlessBackgroundVideo";
import SegmentedNav from "../molecules/SegmentedNav";

export default function WeatherLayout({
    children,
    bottomTabs,                 // [{to,label,icon}]
    videoProps = {},
    mainClassName = "",         // override/extend container (width, padding)
    overlay = true,
}) {
    return (
        <div className="relative min-h-screen w-full overflow-hidden">
            <SeamlessBackgroundVideo
                src="/ssvid.net--Deep-Blue-Sky-Clouds-Timelapse-Free-Footage_1080p.mp4"
                crossfade={0.9}     // 0.7–1.2 biasanya enak
                startAt={0}
                playbackRate={1}
            />
            {overlay && (
                <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-black/10 via-black/0 to-black/10" />
            )}

            <main className={`relative z-10 mx-auto max-w-[1200px] px-4 py-8 sm:px-6 ${mainClassName}`}>
                {children}

                {bottomTabs?.length ? (
                    <div className="mt-8 mb-2 flex w-full justify-center">
                        <SegmentedNav tabs={bottomTabs} />
                    </div>
                ) : null}
            </main>
        </div>
    );
}
