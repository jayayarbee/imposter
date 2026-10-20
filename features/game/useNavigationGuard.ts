"use client";
import { useEffect } from "react";

/**
 * While a round is active: warn on reload/close and neutralise the browser Back button,
 * so nobody can navigate away (or into a previous player's screen) by accident.
 */
export function useNavigationGuard(active: boolean) {
  useEffect(() => {
    if (!active) return;
    window.history.pushState({ guard: true }, "");
    const onPop = () => window.history.pushState({ guard: true }, "");
    const onUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("popstate", onPop);
    window.addEventListener("beforeunload", onUnload);
    return () => {
      window.removeEventListener("popstate", onPop);
      window.removeEventListener("beforeunload", onUnload);
    };
  }, [active]);
}
