"use client";

import { useEffect, useRef } from "react";

/**
 * Hero background video — David's own pick (Slack 2026-08-19: "use this one
 * for a background loop.. with a darker overlay on it").
 *
 * 2026-08-20: switched from the YouTube iframe to the video FILE, self-hosted
 * (854x380 - the highest quality the upload has, identical to what the embed
 * served). The iframe could not meet the brief: its play/pause overlay lives
 * inside YouTube's frame where no CSS can reach it, and its player boot cost
 * a 2-3s dark hole on first load. A native <video> has no chrome at all
 * (a play button cannot exist), the poster frame paints with the first
 * HTML - "foran nazar aani chahiye" - and `loop` restarts gaplessly. The
 * file is pre-trimmed to start at the 1.6s mark (Shahzaib: "play the video
 * from 1.5 seconds onwards"), so the dark intro never renders on any cycle.
 *
 * pointer-events off: it is scenery, not a player. Hidden on phones
 * (styles/globals.css) to keep their payload light.
 */
export function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    // React does not always serialize `muted` into SSR HTML; set it as a
    // property and kick playback so autoplay never silently stalls.
    v.muted = true;
    const kick = () => v.play().catch(() => {});
    kick();
    v.addEventListener("canplay", kick);
    return () => v.removeEventListener("canplay", kick);
  }, []);

  return (
    <div className="hero-video" aria-hidden="true">
      <video
        ref={ref}
        className="hero-video-el"
        src="/videos/hero-loop.mp4"
        poster="/videos/hero-poster.jpg"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />
      <div className="hero-video-shade" />
    </div>
  );
}
