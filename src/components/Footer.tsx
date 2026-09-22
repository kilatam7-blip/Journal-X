import { images, popularList } from "../content";
import { useUI } from "../context/UIContext";

export default function Footer() {
  const { openArticle, bookmarks, toggleBookmark, likes, toggleLike } = useUI();
  const featuredId = "featured-rockies";

  return (
    <footer className="bg-[#0d0a07]">
      <section className="mx-auto max-w-[1320px] px-6 py-24 lg:px-10 lg:py-28">
        <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
          {/* Featured article */}
          <div className="group relative overflow-hidden rounded-3xl">
            <div className="relative aspect-[16/10] sm:aspect-[16/9]">
              <img
                src={images.featured}
                alt="Featured"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

              <div className="absolute top-6 right-6 flex items-center gap-2 rounded-full bg-[#e8b07a] px-3.5 py-1.5 text-xs font-semibold text-[#0d0a07]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#0d0a07]" />
                Editor's pick
              </div>

              {/* Save/Like on featured */}
              <div className="absolute top-6 left-6 flex gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleLike(featuredId);
                  }}
                  aria-label="Like"
                  className={`flex h-9 w-9 items-center justify-center rounded-full border backdrop-blur-md transition-all ${
                    likes[featuredId]
                      ? "border-[#e8b07a]/50 bg-[#e8b07a]/20 text-[#e8b07a]"
                      : "border-white/20 bg-black/40 text-white hover:bg-black/60"
                  }`}
                >
                  <svg viewBox="0 0 24 24" fill={likes[featuredId] ? "currentColor" : "none"} stroke="currentColor" strokeWidth={2} className="h-4 w-4">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleBookmark(featuredId);
                  }}
                  aria-label="Save"
                  className={`flex h-9 w-9 items-center justify-center rounded-full border backdrop-blur-md transition-all ${
                    bookmarks[featuredId]
                      ? "border-[#e8b07a]/50 bg-[#e8b07a]/20 text-[#e8b07a]"
                      : "border-white/20 bg-black/40 text-white hover:bg-black/60"
                  }`}
                >
                  <svg viewBox="0 0 24 24" fill={bookmarks[featuredId] ? "currentColor" : "none"} stroke="currentColor" strokeWidth={2} className="h-4 w-4">
                    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                  </svg>
                </button>
              </div>

              <button
                onClick={() =>
                  openArticle({
                    id: featuredId,
                    title: "Beyond the trailhead: chasing silence across the Canadian Rockies",
                    category: "Adventure",
                    date: "March 18, 2026",
                    image: images.featured,
                    description:
                      "Six days, two cameras, one rented truck — a slow, deliberate look at the landscapes that make you feel both small and infinite.",
                    author: "Sophie Moore",
                    readTime: "8 min read",
                  })
                }
                className="absolute inset-0 flex flex-col items-start justify-end p-8 text-left sm:p-10"
              >
                <div className="mb-5 flex flex-wrap items-center gap-3 text-xs text-white/80">
                  <span className="rounded-full border border-white/25 bg-white/10 px-3 py-1 backdrop-blur-md">
                    Adventure
                  </span>
                  <span className="flex items-center gap-1.5">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="h-3.5 w-3.5">
                      <rect x="3" y="4" width="18" height="18" rx="2" />
                      <path d="M16 2v4M8 2v4M3 10h18" />
                    </svg>
                    March 18, 2026
                  </span>
                  <span className="hidden sm:inline">· 8 min read</span>
                </div>
                <h3 className="font-display text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-[44px]">
                  Beyond the trailhead:
                  <br />
                  chasing silence across
                  <br />
                  the Canadian Rockies
                </h3>
                <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-white/90 transition-colors group-hover:text-[#e8b07a]">
                  Read the full feature →
                </div>
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="flex flex-col gap-6">
            <div className="rounded-3xl border border-white/8 bg-[#15110d] p-7">
              <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#e8b07a]">
                Editor
              </p>
              <div className="flex items-start gap-4">
                <img
                  src={images.author}
                  alt="Sophie Moore"
                  className="h-16 w-16 flex-shrink-0 rounded-full object-cover ring-2 ring-[#e8b07a]/30"
                />
                <div className="flex-1">
                  <h4 className="font-display text-xl font-bold text-[#f5efe7]">
                    Sophie Moore
                  </h4>
                  <p className="mt-1 text-xs text-[#a89a8a]">Senior Editor & Writer</p>
                </div>
              </div>
              <p className="mt-5 text-sm leading-relaxed text-[#a89a8a]">
                Sophie has spent the last decade chasing stories through deserts,
                mountains, and rainforests. She believes the best writing happens
                far from a desk.
              </p>
              <div className="mt-5 flex items-center gap-2">
                {[
                  { Icon: "instagram", label: "Instagram" },
                  { Icon: "twitter", label: "Twitter" },
                  { Icon: "youtube", label: "YouTube" },
                  { Icon: "facebook", label: "Facebook" },
                ].map((s) => (
                  <a
                    key={s.label}
                    href="#"
                    aria-label={s.label}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-[#a89a8a] transition-all hover:border-[#e8b07a]/40 hover:bg-[#e8b07a]/10 hover:text-[#e8b07a]"
                  >
                    <SocialIcon name={s.Icon} />
                  </a>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-white/8 bg-[#15110d] p-7">
              <div className="mb-5 flex items-center justify-between">
                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#e8b07a]">
                  Popular articles
                </p>
                <a href="#" className="text-xs text-[#a89a8a] hover:text-[#e8b07a]">
                  See all
                </a>
              </div>
              <div className="space-y-4">
                {popularList.map((item, i) => (
                  <button
                    key={i}
                    onClick={() =>
                      openArticle({
                        id: `poplist-${i}`,
                        title: item.title,
                        category: "Adventure",
                        date: item.date,
                        image: item.image,
                        description:
                          "Editor-curated travel stories from across the globe — long-form, slow, and beautifully written.",
                        author: "Journal X Editors",
                        readTime: "5 min read",
                      })
                    }
                    className="group flex w-full items-start gap-3 rounded-xl p-2 -m-2 text-left transition-colors hover:bg-white/[0.03]"
                  >
                    <span className="font-display text-lg font-bold text-[#6b4a30]">
                      0{i + 1}
                    </span>
                    <img
                      src={item.image}
                      alt=""
                      className="h-14 w-14 flex-shrink-0 rounded-lg object-cover"
                      loading="lazy"
                    />
                    <div className="flex-1 min-w-0">
                      <h5 className="line-clamp-2 text-sm font-semibold leading-snug text-[#f5efe7] transition-colors group-hover:text-[#e8b07a]">
                        {item.title}
                      </h5>
                      <p className="mt-1 text-[11px] text-[#a89a8a]">{item.date}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>

      <div className="border-t border-white/5">
        <div className="mx-auto flex max-w-[1320px] flex-col items-center justify-between gap-6 px-6 py-8 sm:flex-row lg:px-10">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#e8b07a] to-[#6b4a30]">
              <svg viewBox="0 0 24 24" fill="none" stroke="#0d0a07" strokeWidth={2.4} className="h-4 w-4">
                <circle cx="12" cy="12" r="10" />
                <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" fill="#0d0a07" />
              </svg>
            </span>
            <span className="text-sm font-semibold tracking-tight">
              Journal <span className="text-[#e8b07a]">X</span>
            </span>
          </div>
          <p className="text-xs text-[#a89a8a]">
            © 2026 Journal X. Field-tested stories, written by humans, for humans.
          </p>
          <div className="flex items-center gap-6 text-xs text-[#a89a8a]">
            <a href="#" className="hover:text-[#e8b07a]">Privacy</a>
            <a href="#" className="hover:text-[#e8b07a]">Terms</a>
            <a href="#" className="hover:text-[#e8b07a]">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ name }: { name: string }) {
  if (name === "instagram")
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-3.5 w-3.5">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      </svg>
    );
  if (name === "twitter")
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    );
  if (name === "youtube")
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-3.5 w-3.5">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
        <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor" />
      </svg>
    );
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
      <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
    </svg>
  );
}
