import { useNavigate } from "@tanstack/react-router";

/**
 * Runs `apply` (an async navigation) inside the native View Transitions
 * API when available. Both the phone-card and the promo copy carry a
 * view-transition-name, so when their grid order flips between /login and
 * /signup, the browser morphs each one from its old position to its new
 * one — the "swap sides" motion.
 *
 * Important: `apply` must be awaited *inside* the transition callback.
 * TanStack Router's `navigate()` resolves asynchronously (it lazy-loads
 * the destination route's chunk before committing the DOM), so the
 * browser has to wait for that promise before it's allowed to snapshot
 * the "after" state — otherwise it captures the swap before anything
 * has actually moved and the transition looks like nothing happened.
 */
export function runAuthTransition(apply: () => Promise<void>) {
  if (typeof document === "undefined") {
    void apply();
    return;
  }

  const startViewTransition = (
    document as Document & {
      startViewTransition?: (
        cb: () => void | Promise<void>,
      ) => { finished: Promise<void> };
    }
  ).startViewTransition?.bind(document);

  if (
    !startViewTransition ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    void apply();
    return;
  }

  startViewTransition(() => apply());
}

/**
 * Navigate between /login and /signup with the swap transition. Returns a
 * click handler you can drop straight onto a `Link`'s `onClick` (the
 * Link's own navigation is skipped since we preventDefault first).
 */
export function useAuthNav() {
  const navigate = useNavigate();

  return (to: "/login" | "/signup") =>
    (event: { preventDefault: () => void }) => {
      event.preventDefault();
      runAuthTransition(() => navigate({ to }));
    };
}
