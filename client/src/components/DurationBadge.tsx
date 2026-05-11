/**
 * DurationBadge - reads the real duration from a media file's metadata.
 *
 * The catalog's `durationMin` field has historically gone out of sync with
 * the actual files (e.g. a 52:52 audio listed as 38 min). This component
 * probes the file's metadata at mount time and renders whatever the
 * browser reports, falling back to the catalog value while the probe is
 * in flight or if it fails (offline, missing file, CORS, etc.).
 *
 * Format:
 *   <  60 min   "M:SS"        (e.g. "52:52")
 *   >= 60 min   "H:MM:SS"     (e.g. "1:04:07")
 *
 * The probe uses `preload="metadata"` which only fetches the few KB of
 * header data needed for duration. No full media body is downloaded.
 */
import { useEffect, useRef, useState } from "react";

export interface DurationBadgeProps {
  /** Media URL (same value passed to <audio>/<video> source). */
  src: string;
  /** Whether to probe via <audio> or <video>. Must match the actual file. */
  type: "audio" | "video";
  /** Catalog fallback used while probing or on error. Minutes. */
  fallbackMin?: number;
}

function formatSeconds(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return "";
  const total = Math.round(seconds);
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  const pad = (n: number) => n.toString().padStart(2, "0");
  return h > 0 ? `${h}:${pad(m)}:${pad(s)}` : `${m}:${pad(s)}`;
}

export function DurationBadge({ src, type, fallbackMin }: DurationBadgeProps) {
  const [seconds, setSeconds] = useState<number | null>(null);
  const elRef = useRef<HTMLMediaElement | null>(null);

  useEffect(() => {
    /* Skip the probe entirely if there's no source. */
    if (!src) return;

    /* SSR / non-browser: stay on the fallback. */
    if (typeof document === "undefined") return;

    const el = document.createElement(type) as HTMLMediaElement;
    elRef.current = el;
    el.preload = "metadata";
    el.muted = true; /* Belt-and-braces against autoplay heuristics. */

    const onLoaded = () => {
      /* Some browsers return Infinity for HLS / range-served files. */
      if (Number.isFinite(el.duration) && el.duration > 0) {
        setSeconds(el.duration);
      }
    };
    const onError = () => {
      /* Stay on fallback; do not crash the tile. */
    };

    el.addEventListener("loadedmetadata", onLoaded);
    el.addEventListener("error", onError);

    el.src = src;
    /* Some browsers won't fetch metadata until .load() is called explicitly
       when the element isn't in the document tree. */
    try { el.load(); } catch { /* noop */ }

    return () => {
      el.removeEventListener("loadedmetadata", onLoaded);
      el.removeEventListener("error", onError);
      /* Free the network handle so we don't leak a buffered range. */
      try { el.removeAttribute("src"); el.load(); } catch { /* noop */ }
      elRef.current = null;
    };
  }, [src, type]);

  if (seconds != null) return <>{formatSeconds(seconds)}</>;
  if (fallbackMin != null) return <>{fallbackMin} min</>;
  return null;
}

export default DurationBadge;
