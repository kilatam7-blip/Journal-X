import { useEffect, useRef, useState } from "react";
import { images } from "../content";
import { useUI } from "../context/UIContext";

const slides = [
  {
    image: images.hero,
    category: "Adventure",
    date: "March 22, 2026",
    headline: "Conquer the wild:\nExploring terrains and\nconquering nature",
    subtext:
      "A field journal from the Sahara, where dunes shift like oceans and the only compass worth trusting is the one between your ribs.",
    description:
      "Three days, two writers, one desert. An intimate field journal from the Sahara, where dunes shift like oceans.",
  },
  {
    image: images.featured,
    category: "Travel",
    date: "March 14, 2026",
    headline: "Beneath wide skies:\nNotes from the Canadian\nRockies at first light",
    subtext:
      "Six days, two cameras, one rented truck — a slow, deliberate look at the landscapes that make you feel both small and infinite.",
    description:
      "Six days, two cameras, one rented truck — a slow, deliberate look at the landscapes that make you feel small.",
  },
  {
    image: images.popular3,
    category: "Adventure",
    date: "February 28, 2026",
    headline: "Where the dunes end:\nA pilgrim's diary from\nthe edge of the Namib",
    subtext:
      "Sunrise on the world's oldest desert, and the strange stillness that finds you when the only sound is your own footsteps fading.",
    description:
      "Sunrise on the world's oldest desert, and the strange stillness that finds you when only your footsteps remain.",
  },
];

const ROTATION_MS = 7000;

export default function Hero() {
  const { openArticle } = useUI();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const startRef = useRef<number>(Date.now());

  // Auto-rotation
  useEffect(() => {
    if (paused) return;
    startRef.current = Date.now();
    let raf = 0;
    const tick = () => {
      const elapsed = Date.now() - startRef.current;
      const p = Math.min(elapsed / ROTATION_MS, 1);
      setProgress(p);
      if (p >= 1) {
        setActive((a) => (a + 1) % slides.length);
        startRef.current = Date.now();
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [paused, active]);

  const go = (i: number) => {
    setActive(i);
    startRef.current = Date.now();
    setProgress(0);
  };

  const slide = slides[active];

  return (
    <section
      className="relative -mt-px"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative mx-auto max-w-[1320px] px-6 pt-8 lg:px-10">
        <div className="relative h-[560px] overflow-hidden rounded-[28px] shadow-2xl shadow-black/40 sm:h-[620px] lg:h-[680px]">
          {slides.map((s, i) => (
            <div
              key={i}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                i === active ? "opacity-100" : "opacity-0"
              }`}
            >
              <img
                src={s.image}
                alt=""
                className="h-full w-full object-cover"
                loading={i === 0 ? "eager" : "lazy"}
              />
            </div>
          ))}

          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />

          <div className="relative flex h-full flex-col justify-between p-8 sm:p-12 lg:p-16">
            <div className="max-w-3xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-[#e8b07a]" />
                <span className="text-xs font-medium tracking-wide text-white">
                  {slide.category}
                </span>
                <span className="h-3 w-px bg-white/30" />
                <span className="text-xs tracking-wide text-white/70">
                  {slide.date}
                </span>
              </div>

              <h1 className="font-display text-4xl font-bold leading-[1.05] text-white sm:text-5xl lg:text-[68px]">
                {slide.headline.split("\n").map((line, i) => (
                  <span key={i} className="block">
                    {line}
                  </span>
                ))}
              </h1>

              <p className="mt-6 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
                {slide.subtext}
              </p>
            </div>

            <div className="flex items-end justify-between gap-6">
              <button
                onClick={() =>
                  openArticle({
                    id: `hero-${active}`,
                    title: slide.headline.replace(/\n/g, " "),
                    category: slide.category,
                    date: slide.date,
                    image: slide.image,
                    description: slide.description,
                    author: "Sophie Moore",
                    readTime: "8 min read",
                  })
                }
                className="group inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#0d0a07] transition-all hover:bg-[#e8b07a]"
              >
                Read the story
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                >
                  <path d="M5 12h14" />
                  <path d="m13 5 7 7-7 7" />
                </svg>
              </button>

              {/* Controls */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => go((active - 1 + slides.length) % slides.length)}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-all hover:bg-white/20"
                  aria-label="Previous slide"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
                    <path d="m15 18-6-6 6-6" />
                  </svg>
                </button>

                <div className="flex items-center gap-2">
                  {slides.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => go(i)}
                      aria-label={`Go to slide ${i + 1}`}
                      className={`relative h-2 overflow-hidden rounded-full transition-all ${
                        i === active ? "w-16 bg-white/20" : "w-2 bg-white/40 hover:bg-white/70"
                      }`}
                    >
                      {i === active && (
                        <span
                          className="absolute inset-y-0 left-0 bg-white transition-[width] duration-100"
                          style={{ width: `${progress * 100}%` }}
                        />
                      )}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => go((active + 1) % slides.length)}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-all hover:bg-white/20"
                  aria-label="Next slide"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
