import { useEffect, useRef, useState } from "react";

// mini helper
const cx = (...c) => c.filter(Boolean).join(" ");

export default function SSeamlessBackgroundVideo({
    src,
    className,
    crossfade = 0.8,     // detik: lama fade overlay
    startAt = 0,         // mulai dari detik ke-
    playbackRate = 1,
    poster,
    overlayClassName,
    overlay = "from-black/20 via-black/10 to-black/20", // gradient default
}) {
    const v = useRef(null);
    const [fade, setFade] = useState(0); // 0..1

    useEffect(() => {
        const el = v.current;
        if (!el) return;


        const play = () => {
            try {
                el.playbackRate = playbackRate || 1;
                const p = el.play();
                if (p?.catch) p.catch(() => { });
            } catch { console.log("video not found!!") }
        };

        const prime = () => {
            try { el.currentTime = startAt || 0; } catch { console.log("cannot start") }
            play();
        };

        const onLoaded = () => prime();

        // pakai timeupdate untuk trigger fade saat mendekati akhir
        let ticking = false;
        const onTime = () => {
            if (ticking) return;
            ticking = true;
            requestAnimationFrame(() => {
                ticking = false;
                const dur = el.duration || 0;
                if (!(dur > 0)) return;
                const remain = dur - el.currentTime;

                if (remain <= crossfade) setFade(1);     // fade out menjelang akhir

                if (el.currentTime >= dur) {             // “loop” manual
                    prime();                               // lompat ke awal
                    setTimeout(() => setFade(0), 40);      // fade in lagi
                }
            });
        };

        el.addEventListener("loadedmetadata", onLoaded, { once: true });
        el.addEventListener("timeupdate", onTime);
        if (!isNaN(el.duration) && el.duration > 0) onLoaded();

        return () => { el.removeEventListener("timeupdate", onTime); };
    }, [src, crossfade, startAt, playbackRate]);

    const fadeMs = Math.max(50, crossfade * 1000);

    return (
        <div aria-hidden className={cx("fixed inset-0 -z-10", className)}>
            <video
                ref={v}
                className="absolute inset-0 h-full w-full object-cover"
                muted
                playsInline
                preload="auto"
                loop={false}        // loop manual agar bisa fade
                poster={poster}
            >
                <source src={src?.startsWith("/public/") ? src.replace("/public", "") : src} type="video/mp4" />
            </video>

            {/* overlay untuk menyamarkan lompatan loop */}
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
