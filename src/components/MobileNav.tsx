import { Drawer } from "./Overlays";
import { useUI } from "../context/UIContext";

const links = [
  { label: "Home", active: true },
  { label: "About" },
  { label: "Pages" },
  { label: "Categories" },
  { label: "Shop" },
  { label: "Contact" },
];

export default function MobileNav() {
  const { mobileNavOpen, setMobileNavOpen, openSearch, openCart, theme, toggleTheme } = useUI();

  return (
    <Drawer open={mobileNavOpen} onClose={() => setMobileNavOpen(false)} side="left">
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
          <div className="flex items-center gap-2.5">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#e8b07a] to-[#6b4a30]">
              <svg viewBox="0 0 24 24" fill="none" stroke="#0d0a07" strokeWidth={2.4} className="h-5 w-5">
                <circle cx="12" cy="12" r="10" />
                <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" fill="#0d0a07" />
              </svg>
            </span>
            <span className="text-lg font-semibold text-[#f5efe7]">
              Journal <span className="text-[#e8b07a]">X</span>
            </span>
          </div>
          <button
            onClick={() => setMobileNavOpen(false)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[#a89a8a] hover:text-white"
            aria-label="Close menu"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-6 py-6">
          <ul className="space-y-1">
            {links.map((l) => (
              <li key={l.label}>
                <a
                  href="#"
                  onClick={() => setMobileNavOpen(false)}
                  className={`flex items-center justify-between rounded-xl px-4 py-3.5 text-base font-medium transition-colors ${
                    l.active
                      ? "bg-white/8 text-[#f5efe7]"
                      : "text-[#a89a8a] hover:bg-white/5 hover:text-[#f5efe7]"
                  }`}
                >
                  {l.label}
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-8 grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                setMobileNavOpen(false);
                openSearch();
              }}
              className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-[#f5efe7] hover:bg-white/10"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
              Search
            </button>
            <button
              onClick={() => {
                setMobileNavOpen(false);
                openCart();
              }}
              className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-[#f5efe7] hover:bg-white/10"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6" />
              </svg>
              Cart
            </button>
          </div>
        </nav>

        <div className="border-t border-white/10 px-6 py-5">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-widest text-[#a89a8a]">Appearance</p>
              <p className="text-sm text-[#f5efe7]">
                {theme === "dark" ? "Dark mode" : "Light mode"}
              </p>
            </div>
            <button
              onClick={toggleTheme}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[#e8b07a] hover:bg-white/10"
              aria-label="Toggle theme"
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
          </div>
          <a
            href="#"
            className="block rounded-full bg-white px-5 py-3 text-center text-sm font-semibold text-[#0d0a07] hover:bg-[#e8b07a]"
          >
            Subscribe to the journal
          </a>
        </div>
      </div>
    </Drawer>
  );
}
