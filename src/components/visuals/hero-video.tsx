"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Hero background video — David's own pick (Slack 2026-08-19: "I already gave
 * you an embed to put at the top.. please use that one"), the ideolab.ai
 * YouTube video, running muted on a loop behind the hero with a dark overlay
 * over it ("use this one for a background loop.. with a darker overlay on it").
 *
 * Implementation notes (2026-08-20, Shahzaib's three issues):
 *  - The layer starts transparent and only fades in once frames are actually
 *    playing, so a cold first load shows the styled hero backdrop instead of
 *    a flat black box ("On First Website Load it shows Dark, Video is not
 *    showing").
 *  - Playback starts at 1.6s and every loop returns there, skipping the dark
 *    intro ("we can play the video from 1.5 seconds onwards").
 *  - NO loop/playlist params: playlist mode is what drew the prev/pause/next
 *    control cluster mid-frame ("there is the play-pause ICON showing up").
 *    Looping is done by hand instead - a watcher seeks back to 1.6s just
 *    BEFORE the end, so the player never hits ENDED (whose end-screen would
 *    flash) and never needs playlist chrome.
 *  - pointer-events off: it is scenery, not a player. Hidden on phones
 *    (styles/globals.css) where autoplay is unreliable and the payload heavy.
 */
const VIDEO_ID = "UpctIM8hvV4";
const START_AT = 1.6; // skip the dark intro; every loop re-enters here
const WRAP_BEFORE_END = 1.2; // seek back this long before the end

type YTPlayer = {
  mute: () => void;
  playVideo: () => void;
  seekTo: (s: number, allowSeekAhead: boolean) => void;
  getCurrentTime: () => number;
  getDuration: () => number;
  destroy: () => void;
};

declare global {
  interface Window {
    YT?: {
      Player: new (el: HTMLElement, opts: unknown) => YTPlayer;
      PlayerState: { ENDED: number; PLAYING: number; PAUSED: number };
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

export function HeroVideo() {
  const hostRef = useRef<HTMLDivElement>(null);
  const [live, setLive] = useState(false);

  useEffect(() => {
    let player: YTPlayer | undefined;
    let watcher: ReturnType<typeof setInterval> | undefined;
    let onMsg: ((ev: MessageEvent) => void) | undefined;
    let cancelled = false;

    const create = () => {
      if (cancelled || !hostRef.current || !window.YT?.Player) return;
      player = new window.YT.Player(hostRef.current, {
        host: "https://www.youtube-nocookie.com",
        videoId: VIDEO_ID,
        playerVars: {
          autoplay: 1,
          mute: 1,
          controls: 0,
          start: Math.floor(START_AT),
          playsinline: 1,
          rel: 0,
          iv_load_policy: 3,
          disablekb: 1,
          fs: 0,
        },
        events: {
          onReady: (e: { target: YTPlayer }) => {
            e.target.mute();
            e.target.seekTo(START_AT, true);
            e.target.playVideo();
            const wrap = () => {
              try {
                const d = e.target.getDuration();
                if (d > 0 && e.target.getCurrentTime() > d - WRAP_BEFORE_END) {
                  e.target.seekTo(START_AT, true);
                }
              } catch {
                /* player mid-teardown */
              }
            };
            // wrap shortly before the end so ENDED (and its end screen)
            // never happens and the loop looks seamless. Driven by the
            // player's own infoDelivery messages (~4/s) because a plain
            // interval gets throttled in background/occluded tabs and can
            // miss the window; the interval stays as a fallback.
            onMsg = (ev: MessageEvent) => {
              if (typeof ev.data !== "string" || !ev.data.includes("infoDelivery")) return;
              wrap();
            };
            window.addEventListener("message", onMsg);
            watcher = setInterval(wrap, 250);
          },
          onStateChange: (e: { data: number; target: YTPlayer }) => {
            const S = window.YT?.PlayerState;
            if (!S) return;
            if (e.data === S.PLAYING) setLive(true);
            // safety nets: nothing can legitimately end or pause it
            if (e.data === S.ENDED) {
              e.target.seekTo(START_AT, true);
              e.target.playVideo();
            }
            if (e.data === S.PAUSED) e.target.playVideo();
          },
        },
      });
    };

    if (window.YT?.Player) {
      create();
    } else {
      const prev = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        prev?.();
        create();
      };
      if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
        const s = document.createElement("script");
        s.src = "https://www.youtube.com/iframe_api";
        document.head.appendChild(s);
      }
    }

    return () => {
      cancelled = true;
      if (watcher) clearInterval(watcher);
      if (onMsg) window.removeEventListener("message", onMsg);
      try {
        player?.destroy();
      } catch {
        /* already gone */
      }
    };
  }, []);

  return (
    <div className={`hero-video${live ? " is-live" : ""}`} aria-hidden="true">
      {/* the API replaces this div with the player iframe in place */}
      <div ref={hostRef} />
      <div className="hero-video-shade" />
    </div>
  );
}
