import { useUI } from "../context/UIContext";
import { useScrolled } from "../utils/useScroll";
import { ThemeToggle } from "./Chrome";

const navLinks = [
  { label: "Home", href: "#", active: true },
  { label: "About", href: "#" },
  { label: "Pages", href: "#" },
  { label: "Contact", href: "#" },
];

export default function Navbar() {
  const {
    openSearch,
    openCart,
    cartCount,
    setMobileNavOpen,
  } = useUI();
  const scrolled = useScrolled(8);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 navbar-bg-override ${
        scrolled
          ? "border-b border-white/10 bg-[#0d0a07]/85 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent backdrop-blur-0"
      }`}
    >
      <div className="mx-auto flex max-w-[1320px] items-center justify-between px-6 py-4 lg:px-10">
        <a href="#" className="flex items-center gap-2.5">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#e8b07a] to-[#6b4a30] shadow-lg shadow-amber-900/40">
            <svg viewBox="0 0 24 24" fill="none" stroke="#0d0a07" strokeWidth={2.4} className="h-5 w-5">
              <circle cx="12" cy="12" r="10" />
              <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" fill="#0d0a07" />
            </svg>
          </span>
          <span className="text-lg font-semibold tracking-tight text-[#f5efe7]">
            Journal <span className="text-[#e8b07a]">X</span>
          </span>
        </a>

        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                link.active
                  ? "bg-white/10 text-[#f5efe7]"
                  : "text-[#a89a8a] hover:text-[#f5efe7]"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <ThemeToggle />
          <button
            onClick={openSearch}
            aria-label="Search"
            title="Search (⌘ K)"
            className="hidden h-10 w-10 items-center justify-center rounded-full text-[#a89a8a] transition-colors hover:bg-white/5 hover:text-[#f5efe7] sm:flex"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4.5 w-4.5">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
          </button>
          <button
            onClick={openCart}
            aria-label="Cart"
            className="relative hidden h-10 w-10 items-center justify-center rounded-full text-[#a89a8a] transition-colors hover:bg-white/5 hover:text-[#f5efe7] sm:flex"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4.5 w-4.5">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex h-4.5 min-w-[18px] items-center justify-center rounded-full bg-[#e8b07a] px-1 text-[10px] font-bold text-[#0d0a07]">
                {cartCount}
              </span>
            )}
          </button>
          <a
            href="#newsletter"
            className="ml-1 rounded-full bg-[#f5efe7] px-5 py-2.5 text-sm font-semibold text-[#0d0a07] transition-all hover:bg-white hover:shadow-lg hover:shadow-amber-900/30"
          >
            Subscribe
          </a>
          <button
            onClick={() => setMobileNavOpen(true)}
            aria-label="Open menu"
            className="ml-1 flex h-10 w-10 items-center justify-center rounded-full text-[#f5efe7] hover:bg-white/5 lg:hidden"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
