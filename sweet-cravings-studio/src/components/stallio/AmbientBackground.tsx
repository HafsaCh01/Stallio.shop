/**
 * Soft, slow-drifting purple glow layer rendered once at the app root so it
 * shows through every page. Fixed + behind content + non-interactive.
 */
export function AmbientBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <span
        className="absolute -left-[10%] top-[-10%] h-[34rem] w-[34rem] rounded-full bg-violet/20 blur-[160px]"
        style={{ animation: "drift-a 22s ease-in-out infinite" }}
      />
      <span
        className="absolute right-[-12%] top-[28%] h-[30rem] w-[30rem] rounded-full bg-violet/15 blur-[150px]"
        style={{ animation: "drift-b 26s ease-in-out infinite" }}
      />
      <span
        className="absolute bottom-[-16%] left-[22%] h-[28rem] w-[28rem] rounded-full bg-magenta/10 blur-[150px]"
        style={{ animation: "drift-c 30s ease-in-out infinite" }}
      />
    </div>
  );
}
