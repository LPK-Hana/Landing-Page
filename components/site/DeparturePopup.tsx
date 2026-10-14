'use client';

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';

const SEEN_KEY = 'hana-departure-seen';

const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function isSeen() {
  try {
    return sessionStorage.getItem(SEEN_KEY) === '1';
  } catch {
    return false;
  }
}

function markSeen() {
  try {
    sessionStorage.setItem(SEEN_KEY, '1');
  } catch {
    /* ignore */
  }
  listeners.forEach((listener) => listener());
}

export function DeparturePopup() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const seen = useSyncExternalStore(subscribe, isSeen, () => true);
  const [muted, setMuted] = useState(true);
  const open = !seen;

  useEffect(() => {
    if (!open) return;
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    const start = video.play();
    start
      ?.then(async () => {
        video.muted = false;
        try {
          await video.play();
          setMuted(false);
        } catch {
          video.muted = true;
          setMuted(true);
        }
      })
      .catch(() => {
        video.muted = true;
        setMuted(true);
        void video.play().catch(() => undefined);
      });
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const desktop = window.matchMedia('(min-width: 861px)').matches;
    if (!desktop) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') markSeen();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="departure" role="dialog" aria-label="Video keberangkatan">
      <button type="button" className="departure__backdrop" aria-label="Tutup video" onClick={markSeen} />
      <div className="departure__frame">
        <video
          ref={videoRef}
          className="departure__video"
          src="/media/popup-awal.mp4"
          autoPlay
          muted
          playsInline
          preload="auto"
          onEnded={markSeen}
        />
        <button type="button" className="departure__close" onClick={markSeen} aria-label="Tutup">
          ×
        </button>
        {muted ? (
          <button
            type="button"
            className="departure__sound"
            onClick={() => {
              const video = videoRef.current;
              if (!video) return;
              video.muted = false;
              setMuted(false);
              void video.play();
            }}
          >
            Nyalakan suara
          </button>
        ) : null}
      </div>
    </div>
  );
}
