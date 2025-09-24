// src/components/SeamlessBackgroundVideo.jsx
import { useEffect, useRef, useState } from "react";
import { cn } from "../lib/utils";

export default function SeamlessBackgroundVideo({
    src,
    className,
    crossfade = 1.2,     // durasi crossfade (detik)
    warmupLead = 0.8,    // mulai nyalakan video berikutnya sebelum akhir (detik)
    endCrop = 0.04,      // akhiri sedikit lebih awal supaya tidak ketemu black frame (detik)
    startAt = 0,         // mulai dari detik ke-...
    playbackRate = 1,
    poster,
    overlayClassName,
}) {
    const v0 = useRef(null);
    const v1 = useRef(null);
    const [active, setActive] = useState(0); // 0: v0 aktif, 1: v1 aktif
    const [show0, setShow0] = useState(true);
    const [show1, setShow1] = useState(false);

    // Path dari /public jangan pakai prefix /public
    const url = src && src.startsWith("/public/") ? src.replace("/public", "") : src;
    const fadeMs = Math.max(50, crossfade * 1000);

    useEffect(() => {
        const a = active === 0 ? v0.current : v1.current; // video aktif
        const b = active === 0 ? v1.current : v0.current; // video berikutnya
        if (!a || !b) return;

        const safePlay = (vid) => {
            try {
                vid.playbackRate = playbackRate || 1;
                const p = vid.play();
                if (p && typeof p.catch === "function") {
                    p.catch(() => {
                        /* noop */
                    });
                }
            } catch (err) {
                if (import.meta.env?.DEV) console.debug("SBV: play() failed", err);
            }
        };

        const primeVideo = (vid) => {
            try {
                vid.currentTime = startAt || 0;
            // eslint-disable-next-line no-unused-vars, no-empty
            } catch (err) {

            }
            safePlay(vid);
        };

        const onLoaded = () => {
            try {
                a.currentTime = startAt || 0;
                safePlay(a);
            } catch (err) {
                if (import.meta.env?.DEV) console.debug("SBV: onLoaded init failed", err);
            }
        };

        const onEndedA = () => {
            // restart segera
            primeVideo(a);
        };

        const tick = () => {
            const dur = a.duration || 0;
            if (!isFinite(dur) || dur <= 0) return;
            const remaining = dur - a.currentTime;

            // Warm-up lebih awal dari ujung untuk prebuffer
            if (remaining <= crossfade + warmupLead) {
                if (b.paused || b.currentTime === 0) primeVideo(b);
                if (active === 0 && !show1) setShow1(true);
                if (active === 1 && !show0) setShow0(true);
            }

            // Swap sebelum akhir (endCrop) agar tak ketemu frame jelek
            if (remaining <= endCrop) {
                const old = a;
                if (active === 0) setShow0(false);
                else setShow1(false);
                setActive((p) => 1 - p);
                // Setelah fade selesai, pause & reset yang lama
                setTimeout(() => {
                    try {
                        old.pause();
                        old.currentTime = startAt || 0;
                    // eslint-disable-next-line no-unused-vars
                    } catch (err) {
                        /* noop */
                    }
                }, fadeMs + 30);
            }
        };

        // Gunakan requestVideoFrameCallback kalau ada (lebih halus)
        let cancel = false;
        const useRVFC = typeof a.requestVideoFrameCallback === "function";
        const frameLoop = () => {
            if (cancel) return;
            tick();
            a.requestVideoFrameCallback(frameLoop);
        };

        a.addEventListener("loadedmetadata", onLoaded, { once: true });
        a.addEventListener("ended", onEndedA);
        if (!isNaN(a.duration) && a.duration > 0) onLoaded();

        if (useRVFC) {
            a.requestVideoFrameCallback(frameLoop);
        } else {
            a.addEventListener("timeupdate", tick);
        }

        return () => {
            cancel = true;
            if (!useRVFC) a.removeEventListener("timeupdate", tick);
            a.removeEventListener("ended", onEndedA);
        };
    }, [
        active,
        crossfade,
        warmupLead,
        endCrop,
        playbackRate,
        startAt,
        show0,
        show1,
        fadeMs,
    ]);

    return (
        <div aria-hidden className={cn("fixed inset-0 -z-10", className)}>
            {/* Video 0 */}
            <video
                ref={v0}
                className="absolute inset-0 h-full w-full object-cover transition-opacity"
                style={{
                    opacity: show0 ? 1 : 0,
                    transitionDuration: `${fadeMs}ms`,
                    willChange: "opacity",
                    transform: "translateZ(0)", // hint GPU
                }}
                muted
                playsInline
                preload="auto"
                loop
                poster={poster}
            >
                <source src={url} type="video/mp4" />
            </video>

            {/* Video 1 */}
            <video
                ref={v1}
                className="absolute inset-0 h-full w-full object-cover transition-opacity"
                style={{
                    opacity: show1 ? 1 : 0,
                    transitionDuration: `${fadeMs}ms`,
                    willChange: "opacity",
                    transform: "translateZ(0)",
                }}
                muted
                playsInline
                preload="auto"
                loop
                poster={poster}
            >
                <source src={url} type="video/mp4" />
            </video>

            {/* Overlay agar teks tetap terbaca */}
            <div
                className={cn(
                    "absolute inset-0 bg-gradient-to-b",
                    "dark:from-slate-400/60 dark:via-slate-500/60 dark:to-slate-400/60 backdrop-blur-[1px]",
                    overlayClassName
                )}
            />
        </div>
    );
}
