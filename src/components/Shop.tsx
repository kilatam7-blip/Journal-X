import { useUI, PRODUCTS } from "../context/UIContext";

export default function Shop() {
  const { addToCart } = useUI();
  return (
    <section className="border-t border-white/5">
      <div className="mx-auto max-w-[1320px] px-6 py-24 lg:px-10 lg:py-28">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-[#a89a8a]">
              Field-tested gear
            </p>
            <h2 className="font-display text-4xl font-bold leading-tight text-[#f5efe7] sm:text-5xl">
              From the Journal X shop
            </h2>
          </div>
          <a
            href="#"
            className="text-sm font-medium text-[#a89a8a] transition-colors hover:text-[#e8b07a]"
          >
            View all products →
          </a>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.map((p) => (
            <div
              key={p.id}
              className="group flex flex-col overflow-hidden rounded-3xl border border-white/5 bg-[#15110d] transition-all hover:border-[#e8b07a]/30"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={p.image}
                  alt={p.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#15110d]/80 to-transparent" />
                <span className="absolute top-4 left-4 rounded-full border border-white/20 bg-black/40 px-3 py-1 text-[10px] font-medium uppercase tracking-widest text-white backdrop-blur-md">
                  New
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-display text-xl font-bold text-[#f5efe7]">{p.name}</h3>
                <p className="mt-1 text-sm text-[#a89a8a]">
                  Limited run. Field-tested by our editors on six continents.
                </p>
                <div className="mt-5 flex items-center justify-between">
                  <span className="font-display text-2xl font-bold text-[#e8b07a]">
                    ${p.price}
                  </span>
                  <button
                    onClick={() => addToCart(p)}
                    className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#0d0a07] transition-all hover:bg-[#e8b07a]"
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
