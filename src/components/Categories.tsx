import { useState } from "react";
import { ArrowUpRight } from "./Icons";
import { useReveal } from "../utils/useReveal";
import { useUI } from "../context/UIContext";
import { images } from "../content";

const baseCategories = [
  {
    title: "Travel",
    description: "Discover hidden destinations, city guides, and wanderlust-fueled stories from across the globe.",
    image: images.travel,
    posts: 42,
  },
  {
    title: "Adventure",
    description: "High-altitude treks, jungle expeditions, and once-in-a-lifetime experiences worth chasing.",
    image: images.adventure,
    posts: 38,
  },
  {
    title: "Gear",
    description: "Honest reviews of backpacks, tents, and the kit we trust on every expedition we take.",
    image: images.gear,
    posts: 27,
  },
];

const extended = [
  {
    title: "Wildlife",
    description: "Up-close with the animals that share the trails, oceans, and skies we travel through.",
    image: "https://images.pexels.com/photos/10513799/pexels-photo-10513799.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=700&w=900",
    posts: 19,
  },
  {
    title: "Culture",
    description: "Food, language, music, and people — the parts of a place no guidebook can capture.",
    image: "https://images.pexels.com/photos/14570524/pexels-photo-14570524.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=700&w=900",
    posts: 31,
  },
  {
    title: "Photography",
    description: "Field-tested techniques from photographers who shoot in places most people only dream of.",
    image: "https://images.pexels.com/photos/38325809/pexels-photo-38325809.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=700&w=900",
    posts: 24,
  },
];

const all = [...baseCategories, ...extended];

const sortOptions = [
  { id: "default", label: "Featured" },
  { id: "az", label: "A → Z" },
  { id: "posts", label: "Most posts" },
];

export default function Categories() {
  const [filter, setFilter] = useState<"all" | "main" | "more">("all");
  const [sort, setSort] = useState<"default" | "az" | "posts">("default");
  const { openArticle } = useUI();
  const ref = useReveal<HTMLDivElement>();

  let categories = all;
  if (filter === "main") categories = baseCategories;
  if (filter === "more") categories = extended;

  categories = [...categories];
  if (sort === "az")
    categories.sort((a, b) => a.title.localeCompare(b.title));
  if (sort === "posts")
    categories.sort((a, b) => b.posts - a.posts);

  return (
    <section ref={ref} className="reveal mx-auto max-w-[1320px] px-6 py-24 lg:px-10 lg:py-28">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-[#a89a8a]">
            Browse by topic
          </p>
          <h2 className="font-display text-4xl font-bold leading-tight text-[#f5efe7] sm:text-5xl lg:text-[56px]">
            Article categories
          </h2>
        </div>
        <a
          href="#"
          className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium text-[#f5efe7] backdrop-blur-sm transition-all hover:border-[#e8b07a]/50 hover:bg-white/10"
        >
          Browse all articles
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </div>

      {/* Filter + sort row */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div className="inline-flex rounded-full border border-white/10 bg-white/[0.03] p-1">
          {[
            { id: "all", label: "All" },
            { id: "main", label: "Featured" },
            { id: "more", label: "More" },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id as typeof filter)}
              className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
                filter === f.id
                  ? "bg-[#e8b07a] text-[#0d0a07]"
                  : "text-[#a89a8a] hover:text-[#f5efe7]"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 text-xs text-[#a89a8a]">
          <span className="uppercase tracking-widest">Sort by</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as typeof sort)}
            className="cursor-pointer rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-[#f5efe7] focus:outline-none focus:ring-2 focus:ring-[#e8b07a]/30"
          >
            {sortOptions.map((o) => (
              <option key={o.id} value={o.id} className="bg-[#15110d] text-[#f5efe7]">
                {o.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((cat, i) => (
          <button
            key={`${cat.title}-${i}`}
            onClick={() =>
              openArticle({
                id: `cat-${cat.title}`,
                title: `${cat.title}: a curated collection`,
                category: cat.title,
                date: "Updated weekly",
                image: cat.image,
                description: cat.description,
                author: "Journal X Editors",
                readTime: "Browse collection",
              })
            }
            className="group relative block aspect-[4/5] overflow-hidden rounded-3xl text-left"
          >
            <img
              src={cat.image}
              alt={cat.title}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10" />

            <div className="absolute top-5 right-5 flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-md transition-all group-hover:border-[#e8b07a] group-hover:bg-[#e8b07a] group-hover:text-[#0d0a07]">
              <ArrowUpRight className="h-4 w-4" />
            </div>

            <div className="absolute top-5 left-5">
              <span className="rounded-full border border-white/20 bg-black/30 px-3 py-1 text-[10px] font-medium uppercase tracking-widest text-white/85 backdrop-blur-md">
                {cat.posts} posts
              </span>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-7">
              <h3 className="font-display text-3xl font-bold text-white sm:text-4xl">
                {cat.title}
              </h3>
              <p className="mt-2.5 max-w-xs text-sm leading-relaxed text-white/75">
                {cat.description}
              </p>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
