import { useEffect, useRef, useState, useMemo } from "react";

const cx = (...c) => c.filter(Boolean).join(" ");

const normalizeSrc = (s) => {
    if (!s) return "";
    return s.startsWith("/public/") ? s.replace("/public", "") : s;
};

export default function SSeamlessBackgroundVideo({
    // src = video default (cerah)
    src = "/clear_VL.mp4",

    // kondisi cuaca
    weather,          // contoh: "clear" | "rain"
    isRaining,        // optional boolean

    className,
    crossfade = 0.8,
    startAt = 0,
    playbackRate = 1,
    poster,
    overlayClassName,
    overlay = "from-black/20 via-black/10 to-black/20",
}) {
    const v = useRef(null);
    const [fade, setFade] = useState(0);

    // HUJAN => rain_VL.mp4, selain itu => src (cerah)
    const resolvedSrc = useMemo(() => {
        const w = String(weather || "").toLowerCase();
        const raining = isRaining === true || w === "rain";
        return normalizeSrc(raining ? "/rain_VL.mp4" : src);
    }, [src, weather, isRaining]);

    useEffect(() => {
        const el = v.current;
        if (!el) return;

        const play = () => {
            try {
                el.playbackRate = playbackRate || 1;
                const p = el.play();
                if (p?.catch) p.catch(() => { });
            } catch { err }
        };

        const prime = () => {
            try { el.currentTime = startAt || 0; } catch { err }
            play();
        };

        const onLoaded = () => prime();

        let ticking = false;
        const onTime = () => {
            if (ticking) return;
            ticking = true;
            requestAnimationFrame(() => {
                ticking = false;
                const dur = el.duration || 0;
                if (!(dur > 0)) return;

                const remain = dur - el.currentTime;
                if (remain <= crossfade) setFade(1);

                if (el.currentTime >= dur) {
                    prime();
                    setTimeout(() => setFade(0), 40);
                }
            });
        };

        el.addEventListener("loadedmetadata", onLoaded, { once: true });
        el.addEventListener("timeupdate", onTime);

        // kalau ganti source, load() akan nembak loadedmetadata lagi
        el.load();

        return () => el.removeEventListener("timeupdate", onTime);
    }, [resolvedSrc, crossfade, startAt, playbackRate]);

    useEffect(() => {
        setFade(0);
    }, [resolvedSrc]);

    const fadeMs = Math.max(50, crossfade * 1000);

    return (
        <div aria-hidden className={cx("fixed inset-0 -z-10", className)}>
            <video
                ref={v}
                className="absolute inset-0 h-full w-full object-cover"
                muted
                playsInline
                preload="auto"
                loop={false}
                poster={poster}
            >
                <source src={resolvedSrc} type="video/mp4" />
            </video>

            <div
                className={cx(
                    "pointer-events-none absolute inset-0 bg-gradient-to-b",
                    overlay,
                    overlayClassName
                )}
                style={{ opacity: fade, transition: `opacity ${fadeMs}ms ease` }}
            />
        </div>
    );
}
