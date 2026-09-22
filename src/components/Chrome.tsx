import { useEffect, useState } from "react";
import { useScrollProgress } from "../utils/useScroll";
import { useUI } from "../context/UIContext";

export function ReadingProgressBar() {
  const progress = useScrollProgress();
  return (
    <div className="pointer-events-none fixed top-0 left-0 right-0 z-[60] h-[3px] bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-[#6b4a30] via-[#e8b07a] to-[#c9a079] transition-[width] duration-150"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

export function BackToTop() {
  const [visible, setVisible] = useState(false);
  const { pushToast } = useUI();
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!visible) return null;
  return (
    <button
      onClick={() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        pushToast("Back to the top");
      }}
      aria-label="Back to top"
      className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-[#e8b07a]/30 bg-[#15110d]/90 text-[#e8b07a] shadow-2xl shadow-black/50 backdrop-blur-xl transition-all hover:scale-105 hover:bg-[#e8b07a] hover:text-[#0d0a07]"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" className="h-4 w-4">
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
    </button>
  );
}

export function ThemeToggle() {
  const { theme, toggleTheme } = useUI();
  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      className="hidden h-10 w-10 items-center justify-center rounded-full text-[#a89a8a] transition-colors hover:bg-white/5 hover:text-[#f5efe7] sm:flex"
    >
      {theme === "dark" ? (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
          <circle cx="12" cy="12" r="5" />
          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  );
}
