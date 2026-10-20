"use client";
import { useCallback, useEffect, useRef, useState } from "react";

export type TimerStatus = "idle" | "running" | "paused" | "expired";

/**
 * Wall-clock based countdown: remaining time is derived from an end timestamp,
 * so it stays correct when the tab is throttled or suspended. The interval is
 * cleaned up on unmount / status change.
 */
export function useCountdown(totalSeconds: number) {
  const total = totalSeconds * 1000;
  const [remaining, setRemaining] = useState(total);
  const [status, setStatus] = useState<TimerStatus>("idle");
  const endAt = useRef(0);

  useEffect(() => {
    if (status !== "running") return;
    const tick = () => {
      const left = endAt.current - Date.now();
      if (left <= 0) {
        setRemaining(0);
        setStatus("expired");
      } else {
        setRemaining(left);
      }
    };
    const id = setInterval(tick, 250);
    document.addEventListener("visibilitychange", tick);
    tick();
    return () => {
      clearInterval(id);
      document.removeEventListener("visibilitychange", tick);
    };
  }, [status]);

  const start = useCallback(() => {
    endAt.current = Date.now() + remaining;
    setStatus("running");
  }, [remaining]);
  const pause = useCallback(() => {
    setRemaining(Math.max(0, endAt.current - Date.now()));
    setStatus("paused");
  }, []);
  const reset = useCallback(() => {
    setRemaining(total);
    setStatus("idle");
  }, [total]);

  return { remaining, status, start, pause, reset, total };
}
