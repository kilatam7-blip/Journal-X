import { useState } from "react";
import { useUI } from "../context/UIContext";
import { useLocalStorage } from "../utils/useLocalStorage";

export default function Newsletter() {
  const { pushToast } = useUI();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [frequency, setFrequency] = useState<"daily" | "weekly">("daily");
  const [subscribedEmail, setSubscribedEmail] = useLocalStorage<string | null>(
    "jx-subscribed",
    null
  );

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) return;
    setSubscribedEmail(email);
    pushToast("You're in. Welcome to the field notes.");
    setEmail("");
    setName("");
  };

  return (
    <section id="newsletter" className="relative overflow-hidden bg-black py-24 lg:py-32">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-[#6b4a30]/15 blur-[140px]" />
        <div className="absolute -top-32 right-1/4 h-72 w-72 rounded-full bg-[#e8b07a]/10 blur-[100px]" />
      </div>

      <div className="relative mx-auto grid max-w-[1320px] gap-14 px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-20 lg:px-10">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-[#e8b07a]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#e8b07a]" />
            Newsletter
          </span>
          <h2 className="mt-6 font-display text-4xl font-bold leading-[1.1] text-white sm:text-5xl lg:text-[58px]">
            Subscribe to our
            <br />
            newsletter to receive
            <br />
            our <span className="italic text-[#e8b07a]">daily news</span>
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-white/60">
            One carefully written email, every morning. Field notes, gear finds,
            and stories from the road — straight to your inbox, no filler.
          </p>

          {subscribedEmail ? (
            <div className="mt-9 max-w-md rounded-2xl border border-[#e8b07a]/30 bg-[#e8b07a]/10 p-5">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#e8b07a] text-[#0d0a07]">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} className="h-4 w-4">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-white">You're subscribed</p>
                  <p className="text-xs text-white/70">{subscribedEmail}</p>
                </div>
                <button
                  onClick={() => {
                    setSubscribedEmail(null);
                    pushToast("Unsubscribed");
                  }}
                  className="text-xs text-white/60 underline-offset-2 hover:text-white hover:underline"
                >
                  Manage
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="mt-9 max-w-md">
              {/* Frequency toggle */}
              <div className="mb-3 inline-flex rounded-full border border-white/15 bg-white/[0.04] p-1">
                {(["daily", "weekly"] as const).map((f) => (
                  <button
                    type="button"
                    key={f}
                    onClick={() => setFrequency(f)}
                    className={`rounded-full px-4 py-1.5 text-xs font-medium capitalize transition-all ${
                      frequency === f
                        ? "bg-white text-black"
                        : "text-white/70 hover:text-white"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>

              {frequency === "weekly" && (
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your first name (optional)"
                  className="mb-3 w-full rounded-full border border-white/15 bg-white/[0.04] px-5 py-3 text-sm text-white placeholder:text-white/40 focus:border-[#e8b07a]/50 focus:outline-none"
                />
              )}

              <div className="flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] p-1.5 backdrop-blur-sm transition-colors focus-within:border-[#e8b07a]/50">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@domain.com"
                  className="flex-1 bg-transparent px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:outline-none"
                  required
                />
                <button
                  type="submit"
                  className="rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-black transition-all hover:bg-[#e8b07a]"
                >
                  Subscribe
                </button>
              </div>
              <p className="mt-4 text-xs text-white/40">
                Join 12,000+ readers. Unsubscribe anytime.
              </p>
            </form>
          )}
        </div>

        <div className="relative flex justify-center lg:justify-end">
          <LaptopMockup />
        </div>
      </div>
    </section>
  );
}

function LaptopMockup() {
  return (
    <div className="relative animate-float">
      <div className="absolute -inset-12 rounded-full bg-[#e8b07a]/15 blur-3xl" />
      <div className="relative w-full max-w-[520px]">
        <div className="relative rounded-t-[18px] bg-gradient-to-b from-[#1a1410] to-[#0a0705] p-2.5 shadow-2xl shadow-black/60 ring-1 ring-white/10">
          <div className="absolute top-1.5 left-1/2 -translate-x-1/2 h-1.5 w-1.5 rounded-full bg-[#0a0705] ring-1 ring-white/10" />
          <div className="relative aspect-[16/10] overflow-hidden rounded-[10px] bg-[#0d0a07]">
            <MiniSite />
          </div>
        </div>
        <div className="relative h-2.5 bg-gradient-to-b from-[#1a1410] to-[#2a1f17]">
          <div className="absolute inset-x-0 top-0 h-px bg-white/10" />
        </div>
        <div className="mx-auto h-2 w-[110%] -translate-x-[4.5%] rounded-b-[20px] bg-gradient-to-b from-[#2a1f17] via-[#1a1410] to-[#0a0705] shadow-2xl shadow-black/60">
          <div className="mx-auto mt-1 h-1 w-24 rounded-b-md bg-black/40" />
        </div>
      </div>
    </div>
  );
}

function MiniSite() {
  return (
    <div className="h-full w-full bg-[#0d0a07] text-white">
      <div className="flex items-center justify-between border-b border-white/5 px-3 py-2">
        <div className="flex items-center gap-1.5">
          <div className="h-4 w-4 rounded-full bg-gradient-to-br from-[#e8b07a] to-[#6b4a30]" />
          <span className="text-[8px] font-semibold tracking-tight">
            Journal <span className="text-[#e8b07a]">X</span>
          </span>
        </div>
        <div className="hidden gap-2 sm:flex">
          {["Home", "About", "Pages", "Contact"].map((l) => (
            <span key={l} className="text-[7px] text-white/60">{l}</span>
          ))}
        </div>
        <div className="rounded-full bg-white px-2 py-0.5 text-[6.5px] font-semibold text-black">
          Subscribe
        </div>
      </div>
      <div className="relative mx-2 mt-2 h-[58%] overflow-hidden rounded-md">
        <img
          src="https://images.pexels.com/photos/28638863/pexels-photo-28638863.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=700"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
        <div className="absolute bottom-1.5 left-2 right-2">
          <span className="rounded-full border border-white/30 bg-white/10 px-1.5 py-0.5 text-[6px] text-white backdrop-blur-sm">
            Adventure • Mar 22, 2026
          </span>
          <h3 className="mt-1 font-display text-[10px] font-bold leading-tight text-white">
            Conquer the wild: Exploring
            <br />
            terrains and conquering nature
          </h3>
        </div>
      </div>
      <div className="mx-2 mt-2 grid grid-cols-3 gap-1.5">
        {[
          "https://images.pexels.com/photos/14570524/pexels-photo-14570524.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=200&w=200",
          "https://images.pexels.com/photos/38325809/pexels-photo-38325809.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=200&w=200",
          "https://images.pexels.com/photos/5052147/pexels-photo-5052147.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=200&w=200",
        ].map((src, i) => (
          <div key={i} className="relative aspect-square overflow-hidden rounded-sm">
            <img src={src} alt="" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <span className="absolute bottom-1 left-1 text-[7px] font-bold text-white">
              {["Travel", "Adventure", "Gear"][i]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
