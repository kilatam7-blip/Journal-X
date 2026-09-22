import { useUI } from "../context/UIContext";
import { images } from "../content";

const allArticles = [
  {
    id: "pop-0",
    title: "Climbing the Atlas Mountains: a slow traveler's guide to North Africa's peaks",
    category: "Adventure",
    date: "Mar 12, 2026",
    image: images.popular1,
  },
  {
    id: "pop-1",
    title: "Ten essentials we never leave home without — tested across four continents",
    category: "Gear",
    date: "Mar 09, 2026",
    image: images.popular2,
  },
  {
    id: "pop-2",
    title: "How I spent 30 days off-grid in Patagonia without a phone signal or itinerary",
    category: "Travel",
    date: "Mar 04, 2026",
    image: images.popular3,
  },
  {
    id: "featured-rockies",
    title: "Beyond the trailhead: chasing silence across the Canadian Rockies",
    category: "Adventure",
    date: "Mar 18, 2026",
    image: images.featured,
  },
  {
    id: "cat-Travel",
    title: "Travel: a curated collection",
    category: "Travel",
    date: "Updated weekly",
    image: images.travel,
  },
  {
    id: "cat-Adventure",
    title: "Adventure: a curated collection",
    category: "Adventure",
    date: "Updated weekly",
    image: images.adventure,
  },
  {
    id: "cat-Gear",
    title: "Gear: a curated collection",
    category: "Gear",
    date: "Updated weekly",
    image: images.gear,
  },
];

export default function Library() {
  const { bookmarks, likes, openArticle, setMobileNavOpen } = useUI();

  const savedItems = allArticles.filter((a) => bookmarks[a.id]);
  const likedItems = allArticles.filter((a) => likes[a.id]);
  const hasAny = savedItems.length > 0 || likedItems.length > 0;

  if (!hasAny) {
    return (
      <section className="border-t border-white/5 bg-[#15110d]">
        <div className="mx-auto max-w-[1320px] px-6 py-16 lg:px-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#e8b07a]">
                Your library
              </p>
              <h3 className="mt-1 font-display text-2xl font-bold text-[#f5efe7]">
                Save stories you love — they'll show up here.
              </h3>
            </div>
            <a
              href="#"
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-[#f5efe7] hover:bg-white/10"
            >
              Start exploring →
            </a>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="border-t border-white/5 bg-[#15110d]">
      <div className="mx-auto max-w-[1320px] px-6 py-20 lg:px-10">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#e8b07a]">
              Your library
            </p>
            <h3 className="font-display text-3xl font-bold text-[#f5efe7] sm:text-4xl">
              Saved & liked
            </h3>
          </div>
          <button
            onClick={() => setMobileNavOpen(true)}
            className="text-sm text-[#a89a8a] hover:text-[#e8b07a]"
          >
            Browse more →
          </button>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <LibraryColumn
            title="Bookmarked"
            icon="bookmark"
            items={savedItems}
            onOpen={openArticle}
            emptyText="Nothing bookmarked yet. Tap the bookmark icon on any story."
          />
          <LibraryColumn
            title="Liked"
            icon="heart"
            items={likedItems}
            onOpen={openArticle}
            emptyText="Nothing liked yet. Tap the heart on any story you enjoy."
          />
        </div>
      </div>
    </section>
  );
}

function LibraryColumn({
  title,
  icon,
  items,
  onOpen,
  emptyText,
}: {
  title: string;
  icon: "bookmark" | "heart";
  items: typeof allArticles;
  onOpen: (a: (typeof allArticles)[number] & { description: string; author: string; readTime: string }) => void;
  emptyText: string;
}) {
  return (
    <div className="rounded-3xl border border-white/5 bg-[#0d0a07]/50 p-6">
      <div className="mb-5 flex items-center gap-2">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#e8b07a]/15 text-[#e8b07a]">
          {icon === "bookmark" ? (
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          )}
        </span>
        <h4 className="font-display text-lg font-bold text-[#f5efe7]">{title}</h4>
        <span className="ml-auto text-xs text-[#a89a8a]">
          {items.length} {items.length === 1 ? "item" : "items"}
        </span>
      </div>

      {items.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-white/10 bg-white/[0.02] p-6 text-center text-sm text-[#a89a8a]">
          {emptyText}
        </p>
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() =>
                onOpen({
                  ...item,
                  description: "From your personal library — open to revisit any time.",
                  author: "Journal X Editors",
                  readTime: "Revisit",
                })
              }
              className="group flex w-full items-start gap-3 rounded-xl p-2 text-left transition-colors hover:bg-white/[0.04]"
            >
              <img src={item.image} alt="" className="h-14 w-20 flex-shrink-0 rounded-lg object-cover" />
              <div className="flex-1 min-w-0">
                <div className="mb-1 flex items-center gap-2 text-[10px] uppercase tracking-widest text-[#e8b07a]">
                  <span>{item.category}</span>
                  <span className="text-[#a89a8a]">·</span>
                  <span className="text-[#a89a8a]">{item.date}</span>
                </div>
                <p className="line-clamp-2 text-sm font-medium text-[#f5efe7] transition-colors group-hover:text-[#e8b07a]">
                  {item.title}
                </p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
