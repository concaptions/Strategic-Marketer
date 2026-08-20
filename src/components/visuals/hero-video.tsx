/**
 * Hero background video — David's own pick (Slack 2026-08-19: "I already gave
 * you an embed to put at the top.. please use that one"), the ideolab.ai
 * YouTube video, running muted on a loop behind the hero with a dark overlay
 * over it ("use this one for a background loop.. with a darker overlay on it").
 *
 * Implementation notes:
 *  - loop needs `playlist=<id>` — YouTube only loops via a single-item playlist.
 *  - the iframe letterboxes internally when the hero's shape isn't 16:9; those
 *    bars are pure black, invisible on this black site under the overlay.
 *  - pointer-events off: it is scenery, not a player. Hidden on phones
 *    (styles/globals.css) where autoplay is unreliable and the payload heavy.
 */
const VIDEO_ID = "UpctIM8hvV4";

const SRC =
  `https://www.youtube-nocookie.com/embed/${VIDEO_ID}` +
  `?autoplay=1&mute=1&controls=0&loop=1&playlist=${VIDEO_ID}` +
  `&playsinline=1&rel=0&modestbranding=1&iv_load_policy=3&disablekb=1&fs=0`;

export function HeroVideo() {
  return (
    <div className="hero-video" aria-hidden="true">
      <iframe
        src={SRC}
        title=""
        tabIndex={-1}
        allow="autoplay; encrypted-media"
        referrerPolicy="strict-origin-when-cross-origin"
      />
      <div className="hero-video-shade" />
    </div>
  );
}
