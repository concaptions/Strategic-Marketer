"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Exit-intent modal, ported from the approved HTML: shows once per visit when the cursor leaves
 * through the top edge (timed fallback on touch devices). Form submit shows the success line;
 * it is NOT wired to an email provider yet.
 */
export function ExitIntent() {
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState(false);
  const shown = useRef(false);

  useEffect(() => {
    const show = () => {
      if (shown.current) return;
      shown.current = true;
      setOpen(true);
    };
    const onOut = (e: MouseEvent) => {
      if (!e.relatedTarget && e.clientY <= 8) show();
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mouseout", onOut);
    document.addEventListener("keydown", onKey);
    const t = setTimeout(() => {
      if ("ontouchstart" in window && !shown.current && window.scrollY > 600) show();
    }, 45000);
    return () => {
      document.removeEventListener("mouseout", onOut);
      document.removeEventListener("keydown", onKey);
      clearTimeout(t);
    };
  }, []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setDone(true);
    setTimeout(() => setOpen(false), 2600);
  };

  return (
    <div
      className={`modal-veil${open ? " show" : ""}`}
      id="exitVeil"
      role="dialog"
      aria-modal="true"
      aria-labelledby="exitTitle"
      onClick={(e) => e.target === e.currentTarget && setOpen(false)}
    >
      <div className="modal">
        <button className="x" aria-label="Close" onClick={() => setOpen(false)}>
          ×
        </button>
        <div className="eyebrow">Free Training</div>
        <h3 id="exitTitle">Not Ready for an Assessment Yet?</h3>
        <p>
          Start with our free training and discover how successful businesses are moving from AI experimentation to
          real implementation.
        </p>
        {!done ? (
          <form onSubmit={submit}>
            <input type="text" name="firstName" placeholder="First name" required aria-label="First name" />
            <input type="email" name="email" placeholder="Email address" required aria-label="Email address" />
            <button className="btn btn-gold" type="submit">
              Watch the Free Training
            </button>
          </form>
        ) : (
          <p className="success" style={{ display: "block" }}>
            ✓ You&apos;re in — check your inbox for the training link.
          </p>
        )}
        <p className="fine">No spam. Unsubscribe anytime.</p>
      </div>
    </div>
  );
}
