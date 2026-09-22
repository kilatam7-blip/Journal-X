import { popularArticles, images } from "../content";
import { useUI } from "../context/UIContext";
import { useReveal } from "../utils/useReveal";

export default function PopularNow() {
  const { openArticle } = useUI();
  const ref = useReveal<HTMLDivElement>();

  return (
    <section className="border-y border-white/5 bg-[#15110d]">
      <div className="mx-auto max-w-[1320px] px-6 py-20 lg:px-10 lg:py-24">
        <div ref={ref} className="reveal grid gap-12 lg:grid-cols-[280px_1fr] lg:gap-20">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#e8b07a]/30 bg-[#e8b07a]/10 px-3 py-1">
              <span className="h-1.5 w-1.5 rounded-full bg-[#e8b07a] animate-pulse-soft" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#e8b07a]">
                Popular now
              </span>
            </div>
            <h2 className="mt-5 font-display text-3xl font-bold leading-tight text-[#f5efe7] sm:text-4xl">
              What the
              <br />
              community
              <br />
              is reading
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-[#a89a8a]">
              Hand-picked stories from the past month that sparked the most
              conversations in our newsletter.
            </p>
          </div>

          <div className="grid gap-10 md:grid-cols-3">
            {popularArticles.map((article, i) => (
              <button
                key={i}
                onClick={() =>
                  openArticle({
                    id: `pop-${i}`,
                    title: article.title,
                    category: article.category,
                    date: article.date,
                    image: images.popular1,
                    description:
                      "An in-depth field report from our editors, with photos and practical notes for anyone planning a similar route.",
                    author: "Sophie Moore",
                    readTime: "7 min read",
                  })
                }
                className="group flex flex-col text-left"
              >
                <div className="mb-5 flex items-center gap-3">
                  <span className="font-display text-3xl font-bold text-[#6b4a30]">
                    0{i + 1}
                  </span>
                  <span className="h-px flex-1 bg-white/10" />
                  <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#e8b07a]">
                    {article.category}
                  </span>
                </div>
                <div className="mb-3 flex items-center gap-2 text-xs text-[#a89a8a]">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="h-3.5 w-3.5">
                    <rect x="3" y="4" width="18" height="18" rx="2" />
                    <path d="M16 2v4M8 2v4M3 10h18" />
                  </svg>
                  {article.date}
                </div>
                <h3 className="font-display text-2xl font-bold leading-snug text-[#f5efe7] transition-colors group-hover:text-[#e8b07a]">
                  {article.title}
                </h3>
                <div className="mt-5 flex items-center gap-2 text-sm font-medium text-[#a89a8a] transition-colors group-hover:text-[#e8b07a]">
                  Read article
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4 transition-transform group-hover:translate-x-1">
                    <path d="M5 12h14" />
                    <path d="m13 5 7 7-7 7" />
                  </svg>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
