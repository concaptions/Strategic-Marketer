"use client";

import { useEffect, useRef } from "react";

/**
 * Hero background video — David's own pick (Slack 2026-08-19: "I already gave
 * you an embed to put at the top.. please use that one"), the ideolab.ai
 * YouTube video, running muted on a loop behind the hero with a dark overlay
 * over it ("use this one for a background loop.. with a darker overlay on it").
 *
 * Implementation notes:
 *  - Built on the YouTube IFrame API instead of a bare embed URL: the
 *    `loop=1&playlist=` params alone were not restarting the video (it played
 *    once and stopped), so onStateChange ENDED explicitly seeks back to 0 and
 *    resumes. The params stay as a second line of defence.
 *  - pointer-events off: it is scenery, not a player. Hidden on phones
 *    (styles/globals.css) where autoplay is unreliable and the payload heavy.
 */
const VIDEO_ID = "UpctIM8hvV4";

type YTPlayer = {
  mute: () => void;
  playVideo: () => void;
  seekTo: (s: number, allowSeekAhead: boolean) => void;
  destroy: () => void;
};

declare global {
  interface Window {
    YT?: {
      Player: new (el: HTMLElement, opts: unknown) => YTPlayer;
      PlayerState: { ENDED: number };
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

export function HeroVideo() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let player: YTPlayer | undefined;
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
          loop: 1,
          playlist: VIDEO_ID,
          playsinline: 1,
          rel: 0,
          iv_load_policy: 3,
          disablekb: 1,
          fs: 0,
        },
        events: {
          onReady: (e: { target: YTPlayer }) => {
            e.target.mute();
            e.target.playVideo();
          },
          onStateChange: (e: { data: number; target: YTPlayer }) => {
            if (e.data === window.YT?.PlayerState.ENDED) {
              e.target.seekTo(0, true);
              e.target.playVideo();
            }
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
      try {
        player?.destroy();
      } catch {
        /* already gone */
      }
    };
  }, []);

  return (
    <div className="hero-video" aria-hidden="true">
      {/* the API replaces this div with the player iframe in place */}
      <div ref={hostRef} />
      <div className="hero-video-shade" />
    </div>
  );
}
