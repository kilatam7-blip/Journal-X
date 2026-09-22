import { useEffect, useState } from "react";
import { Modal } from "./Overlays";
import { useUI } from "../context/UIContext";

export default function ArticleReader() {
  const { activeArticle, closeArticle, likes, toggleLike, bookmarks, toggleBookmark, pushToast } = useUI();
  const [readingProgress, setReadingProgress] = useState(0);

  useEffect(() => {
    setReadingProgress(0);
  }, [activeArticle]);

  if (!activeArticle) return null;

  const liked = !!likes[activeArticle.id];
  const saved = !!bookmarks[activeArticle.id];

  const onShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title: activeArticle.title, text: activeArticle.description });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        pushToast("Link copied to clipboard");
      }
    } catch {
      // user canceled
    }
  };

  return (
    <Modal open={!!activeArticle} onClose={closeArticle} size="xl">
      {/* Reading progress bar */}
      <div className="absolute top-0 left-0 right-0 z-10 h-1 bg-white/5">
        <div
          className="h-full bg-[#e8b07a] transition-all duration-150"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      <div className="flex max-h-[92vh] flex-col">
        {/* Hero image */}
        <div className="relative h-56 flex-shrink-0 sm:h-72">
          <img src={activeArticle.image} alt="" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#15110d] via-transparent to-black/40" />

          <button
            onClick={closeArticle}
            className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-md hover:bg-black/60"
            aria-label="Close"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>

          <div className="absolute bottom-5 left-7 right-7">
            <div className="mb-3 flex flex-wrap items-center gap-3 text-xs text-white/85">
              <span className="rounded-full border border-white/25 bg-white/10 px-3 py-1 backdrop-blur-md">
                {activeArticle.category}
              </span>
              <span>{activeArticle.date}</span>
              {activeArticle.readTime && <span>· {activeArticle.readTime}</span>}
            </div>
            <h2 className="font-display text-2xl font-bold leading-tight text-white sm:text-3xl">
              {activeArticle.title}
            </h2>
          </div>
        </div>

        {/* Scrollable content */}
        <div
          className="flex-1 overflow-y-auto px-7 py-7"
          onScroll={(e) => {
            const el = e.currentTarget;
            const max = el.scrollHeight - el.clientHeight;
            setReadingProgress(max > 0 ? (el.scrollTop / max) * 100 : 0);
          }}
        >
          {/* Author bar */}
          <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-5">
            <div className="flex items-center gap-3">
              <img
                src="https://images.pexels.com/photos/28686637/pexels-photo-28686637.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=120&w=120"
                alt=""
                className="h-10 w-10 rounded-full object-cover ring-2 ring-[#e8b07a]/30"
              />
              <div>
                <p className="text-sm font-semibold text-[#f5efe7]">
                  {activeArticle.author ?? "Sophie Moore"}
                </p>
                <p className="text-xs text-[#a89a8a]">Senior Editor</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => toggleLike(activeArticle.id)}
                className={`flex h-9 w-9 items-center justify-center rounded-full border transition-all ${
                  liked
                    ? "border-[#e8b07a]/50 bg-[#e8b07a]/10 text-[#e8b07a]"
                    : "border-white/10 bg-white/5 text-[#a89a8a] hover:text-[#f5efe7]"
                }`}
                aria-label="Like"
              >
                <svg viewBox="0 0 24 24" fill={liked ? "currentColor" : "none"} stroke="currentColor" strokeWidth={2} className="h-4 w-4">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </button>
              <button
                onClick={() => toggleBookmark(activeArticle.id)}
                className={`flex h-9 w-9 items-center justify-center rounded-full border transition-all ${
                  saved
                    ? "border-[#e8b07a]/50 bg-[#e8b07a]/10 text-[#e8b07a]"
                    : "border-white/10 bg-white/5 text-[#a89a8a] hover:text-[#f5efe7]"
                }`}
                aria-label="Save"
              >
                <svg viewBox="0 0 24 24" fill={saved ? "currentColor" : "none"} stroke="currentColor" strokeWidth={2} className="h-4 w-4">
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                </svg>
              </button>
              <button
                onClick={onShare}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[#a89a8a] transition-all hover:text-[#f5efe7]"
                aria-label="Share"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
                  <circle cx="18" cy="5" r="3" />
                  <circle cx="6" cy="12" r="3" />
                  <circle cx="18" cy="19" r="3" />
                  <path d="m8.59 13.51 6.83 3.98M15.41 6.51l-6.82 3.98" />
                </svg>
              </button>
            </div>
          </div>

          {/* Body */}
          <p className="font-display text-xl italic leading-relaxed text-[#e8b07a]">
            {activeArticle.description}
          </p>
          <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-[#d6cdbf]">
            <p>
              The first morning in the desert is always the loudest — though, of
              course, nothing actually makes a sound. You step out of the tent and
              the silence hits you like a wave. Then, slowly, the small things come
              back: the crunch of gravel under your boots, the faint chime of the
              wind pulling grains of sand across the ridge.
            </p>
            <p>
              We had been walking for three days by then. Two people, one pack
              mule, and a route I'd sketched on the back of a napkin in a café
              in Marrakech. The plan, such as it was, involved a series of
              waypoints that may or may not have existed, depending on which map
              you trusted.
            </p>
            <h3 className="font-display text-2xl font-bold text-[#f5efe7] pt-3">
              What the map can't tell you
            </h3>
            <p>
              No map, however detailed, ever quite captures what it feels like to
              crest a dune at 6:14 a.m. and watch the entire Sahara turn the
              color of warm bread. The light doesn't just illuminate the
              landscape — it reshapes it, every few seconds, as if the earth
              itself is breathing.
            </p>
            <p>
              By day four we had stopped consulting the compass. There is a
              particular freedom in choosing a direction because it feels right,
              and trusting the body to know what the eye cannot.
            </p>
            <blockquote className="border-l-2 border-[#e8b07a] pl-5 font-display text-lg italic text-[#f5efe7]">
              "The wild isn't a place you conquer. It's a place that, given
              enough time, agrees to let you pass through."
            </blockquote>
            <p>
              We made camp that evening in the lee of a dune twice our height,
              and as the temperature dropped we wrote down everything we could
              remember — not because we'd publish it, but because the act of
              remembering is itself a kind of arrival.
            </p>
            <p className="text-[#a89a8a]">
              — Continue reading the full field journal in our next print issue,
              out April 12.
            </p>
          </div>

          <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#e8b07a]">
              Filed under
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {[activeArticle.category, "Field notes", "Slow travel", "Editor's pick"].map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-[#f5efe7]"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
