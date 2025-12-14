// components/layouts/WeatherLayout.jsx
import { useEffect, useState } from "react";
import SeamlessBackgroundVideo from "../SeamlessBackgroundVideo";
import SegmentedNav from "../molecules/SegmentedNav";
import { getGeneral } from "../../lib/api";

export default function WeatherLayout({
    children,
    bottomTabs,                 // [{to,label,icon}]
    videoProps = {},
    mainClassName = "",         // override/extend container (width, padding)
    overlay = true,
}) {
    const [current, setCurrent] = useState([]);

    useEffect(() => {
        getGeneral((data) => setCurrent(data.data))
    })
    return (
        <div className="relative min-h-screen w-full overflow-hidden">
            <SeamlessBackgroundVideo
                src="/clear_VL.mp4"     // video cerah
                weather={current.weather} // "clear" atau "rain"
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
