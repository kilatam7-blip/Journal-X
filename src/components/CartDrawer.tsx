import { Drawer } from "./Overlays";
import { useUI } from "../context/UIContext";
import { useState } from "react";

export default function CartDrawer() {
  const { cartOpen, closeCart, cart, updateQty, removeFromCart, cartTotal, cartCount, pushToast } =
    useUI();
  const [checkingOut, setCheckingOut] = useState(false);
  const [done, setDone] = useState(false);

  const onCheckout = () => {
    setCheckingOut(true);
    setTimeout(() => {
      setCheckingOut(false);
      setDone(true);
      pushToast("Order placed! Check your inbox.");
      setTimeout(() => {
        setDone(false);
        closeCart();
      }, 1500);
    }, 1100);
  };

  return (
    <Drawer open={cartOpen} onClose={closeCart} side="right">
      <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
        <div>
          <h3 className="font-display text-2xl font-bold text-[#f5efe7]">Your cart</h3>
          <p className="text-xs text-[#a89a8a]">
            {cartCount} {cartCount === 1 ? "item" : "items"}
          </p>
        </div>
        <button
          onClick={closeCart}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[#a89a8a] hover:text-white"
          aria-label="Close cart"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-5">
        {cart.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/5 text-[#a89a8a]">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-7 w-7">
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6" />
              </svg>
            </div>
            <p className="font-display text-lg text-[#f5efe7]">Your cart is empty</p>
            <p className="mt-1 text-xs text-[#a89a8a]">
              Add a tee or notebook from the shop to get started.
            </p>
            <button
              onClick={closeCart}
              className="mt-6 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[#0d0a07] hover:bg-[#e8b07a]"
            >
              Continue browsing
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="flex gap-4 rounded-2xl border border-white/5 bg-white/[0.02] p-3">
                <img
                  src={item.image}
                  alt=""
                  className="h-20 w-20 flex-shrink-0 rounded-xl object-cover"
                />
                <div className="flex flex-1 flex-col">
                  <p className="line-clamp-2 text-sm font-medium text-[#f5efe7]">{item.name}</p>
                  <p className="mt-1 text-sm font-semibold text-[#e8b07a]">${item.price}</p>
                  <div className="mt-auto flex items-center justify-between">
                    <div className="flex items-center gap-1 rounded-full border border-white/10 bg-white/5 p-0.5">
                      <button
                        onClick={() => updateQty(item.id, item.qty - 1)}
                        className="flex h-7 w-7 items-center justify-center rounded-full text-[#a89a8a] hover:bg-white/10 hover:text-white"
                        aria-label="Decrease"
                      >
                        −
                      </button>
                      <span className="min-w-6 text-center text-xs font-semibold text-[#f5efe7]">
                        {item.qty}
                      </span>
                      <button
                        onClick={() => updateQty(item.id, item.qty + 1)}
                        className="flex h-7 w-7 items-center justify-center rounded-full text-[#a89a8a] hover:bg-white/10 hover:text-white"
                        aria-label="Increase"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-xs text-[#a89a8a] hover:text-[#e8b07a]"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {cart.length > 0 && (
        <div className="border-t border-white/10 bg-[#0d0a07]/60 px-6 py-5 backdrop-blur-md">
          <div className="mb-4 space-y-2 text-sm">
            <div className="flex justify-between text-[#a89a8a]">
              <span>Subtotal</span>
              <span>${cartTotal}</span>
            </div>
            <div className="flex justify-between text-[#a89a8a]">
              <span>Shipping</span>
              <span>{cartTotal > 60 ? "Free" : "$6"}</span>
            </div>
            <div className="flex justify-between border-t border-white/10 pt-2 font-display text-lg font-bold text-[#f5efe7]">
              <span>Total</span>
              <span>${cartTotal > 60 ? cartTotal : cartTotal + 6}</span>
            </div>
          </div>
          <button
            onClick={onCheckout}
            disabled={checkingOut || done}
            className="w-full rounded-full bg-[#e8b07a] py-3.5 text-sm font-semibold text-[#0d0a07] transition-all hover:bg-white disabled:opacity-60"
          >
            {done ? "Order confirmed ✓" : checkingOut ? "Processing…" : "Checkout"}
          </button>
        </div>
      )}
    </Drawer>
  );
}
