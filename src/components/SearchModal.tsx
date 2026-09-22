import { useMemo, useState } from "react";
import { Modal } from "./Overlays";
import { useUI } from "../context/UIContext";
import { popularArticles, popularList } from "../content";

const trending = ["Patagonia", "Lofoten", "Atlas Mountains", "Gear 2026", "Solo travel"];

export default function SearchModal() {
  const { searchOpen, closeSearch, openArticle } = useUI();
  const [q, setQ] = useState("");

  const results = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return [];
    const items = [
      ...popularArticles.map((a) => ({
        id: a.title,
        title: a.title,
        category: a.category,
        date: a.date,
        image: "https://images.pexels.com/photos/13985982/pexels-photo-13985982.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=200&w=300",
        description: `Read the full ${a.category.toLowerCase()} story about ${a.title}.`,
        author: "Sophie Moore",
        readTime: "6 min read",
      })),
      ...popularList.map((a) => ({
        id: a.title,
        title: a.title,
        category: "Adventure",
        date: a.date,
        image: a.image,
        description: `Field notes from the road: ${a.title}.`,
        author: "Journal X Editors",
        readTime: "5 min read",
      })),
    ];
    return items
      .filter((i) => i.title.toLowerCase().includes(query) || i.category.toLowerCase().includes(query))
      .slice(0, 6);
  }, [q]);

  return (
    <Modal open={searchOpen} onClose={closeSearch} size="lg">
      <div className="flex items-center gap-3 border-b border-white/10 px-6 py-5">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5 text-[#a89a8a]">
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
        <input
          autoFocus
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search articles, authors, destinations…"
          className="flex-1 bg-transparent text-base text-[#f5efe7] placeholder:text-[#a89a8a] focus:outline-none"
        />
        <kbd className="hidden rounded border border-white/15 bg-white/5 px-2 py-1 text-[10px] text-[#a89a8a] sm:inline-block">
          ESC
        </kbd>
      </div>

      <div className="max-h-[60vh] overflow-y-auto px-6 py-5">
        {q.trim() === "" ? (
          <>
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#e8b07a]">
              Trending searches
            </p>
            <div className="flex flex-wrap gap-2">
              {trending.map((t) => (
                <button
                  key={t}
                  onClick={() => setQ(t)}
                  className="rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs text-[#f5efe7] transition-colors hover:border-[#e8b07a]/40 hover:bg-[#e8b07a]/10"
                >
                  {t}
                </button>
              ))}
            </div>
            <p className="mt-8 mb-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#e8b07a]">
              Quick links
            </p>
            <div className="grid gap-2 sm:grid-cols-2">
              {[
                "Subscribe to the newsletter",
                "Browse all categories",
                "Read the latest issue",
                "Meet the editors",
              ].map((l) => (
                <a
                  key={l}
                  href="#"
                  className="rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3 text-sm text-[#f5efe7] transition-colors hover:bg-white/5"
                >
                  {l}
                </a>
              ))}
            </div>
            <p className="mt-6 text-xs text-[#a89a8a]">
              Tip: press <kbd className="rounded border border-white/15 bg-white/5 px-1.5 py-0.5">⌘ K</kbd> anywhere to open search.
            </p>
          </>
        ) : results.length === 0 ? (
          <div className="py-10 text-center">
            <p className="text-sm text-[#a89a8a]">
              No matches for <span className="text-[#f5efe7]">“{q}”</span>. Try a different keyword.
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#e8b07a]">
              {results.length} result{results.length === 1 ? "" : "s"}
            </p>
            {results.map((r) => (
              <button
                key={r.id}
                onClick={() => {
                  openArticle(r);
                  closeSearch();
                  setQ("");
                }}
                className="flex w-full items-center gap-4 rounded-xl border border-white/5 bg-white/[0.02] p-3 text-left transition-all hover:border-[#e8b07a]/30 hover:bg-white/5"
              >
                <img src={r.image} alt="" className="h-14 w-20 flex-shrink-0 rounded-lg object-cover" />
                <div className="flex-1 min-w-0">
                  <div className="mb-1 flex items-center gap-2 text-[10px] uppercase tracking-widest text-[#e8b07a]">
                    <span>{r.category}</span>
                    <span className="text-[#a89a8a]">·</span>
                    <span className="text-[#a89a8a]">{r.date}</span>
                  </div>
                  <p className="line-clamp-2 text-sm font-medium text-[#f5efe7]">{r.title}</p>
                </div>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4 text-[#a89a8a]">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            ))}
          </div>
        )}
      </div>
    </Modal>
  );
}
