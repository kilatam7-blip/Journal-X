import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useLocalStorage } from "../utils/useLocalStorage";

type Theme = "dark" | "light";

interface Article {
  id: string;
  title: string;
  category: string;
  date: string;
  image: string;
  description: string;
  author?: string;
  readTime?: string;
}

interface CartItem {
  id: string;
  name: string;
  price: number;
  qty: number;
  image: string;
}

interface UIContextValue {
  theme: Theme;
  toggleTheme: () => void;
  searchOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;
  cartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, "qty">) => void;
  removeFromCart: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  cartCount: number;
  cartTotal: number;
  activeArticle: Article | null;
  openArticle: (a: Article) => void;
  closeArticle: () => void;
  likes: Record<string, boolean>;
  toggleLike: (id: string) => void;
  bookmarks: Record<string, boolean>;
  toggleBookmark: (id: string) => void;
  toasts: { id: number; text: string }[];
  pushToast: (text: string) => void;
  mobileNavOpen: boolean;
  setMobileNavOpen: (v: boolean) => void;
}

const UIContext = createContext<UIContextValue | null>(null);

const PRODUCTS = [
  {
    id: "p1",
    name: "Journal X Field Tee — Sand",
    price: 38,
    image:
      "https://images.pexels.com/photos/14570524/pexels-photo-14570524.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=200&w=200",
  },
  {
    id: "p2",
    name: "Compass Pin — Brushed Brass",
    price: 24,
    image:
      "https://images.pexels.com/photos/38325809/pexels-photo-38325809.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=200&w=200",
  },
  {
    id: "p3",
    name: "Topo Map Notebook (Limited)",
    price: 19,
    image:
      "https://images.pexels.com/photos/5052147/pexels-photo-5052147.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=200&w=200",
  },
];

export function UIProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useLocalStorage<Theme>("jx-theme", "dark");
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useLocalStorage<CartItem[]>("jx-cart", []);
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);
  const [likes, setLikes] = useLocalStorage<Record<string, boolean>>("jx-likes", {});
  const [bookmarks, setBookmarks] = useLocalStorage<Record<string, boolean>>(
    "jx-bookmarks",
    {}
  );
  const [toasts, setToasts] = useState<{ id: number; text: string }[]>([]);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  // Apply theme to root
  useEffect(() => {
    document.documentElement.classList.toggle("light", theme === "light");
  }, [theme]);

  // ESC closes overlays
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSearchOpen(false);
        setCartOpen(false);
        setActiveArticle(null);
        setMobileNavOpen(false);
      }
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Body scroll lock
  useEffect(() => {
    const anyOpen = searchOpen || cartOpen || !!activeArticle || mobileNavOpen;
    document.body.style.overflow = anyOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [searchOpen, cartOpen, activeArticle, mobileNavOpen]);

  const toggleTheme = useCallback(
    () => setTheme(theme === "dark" ? "light" : "dark"),
    [theme, setTheme]
  );

  const pushToast = useCallback((text: string) => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, text }]);
    setTimeout(() => {
      setToasts((t) => t.filter((x) => x.id !== id));
    }, 2600);
  }, []);

  const addToCart = useCallback(
    (item: Omit<CartItem, "qty">) => {
      setCart((c) => {
        const existing = c.find((x) => x.id === item.id);
        if (existing) {
          return c.map((x) =>
            x.id === item.id ? { ...x, qty: x.qty + 1 } : x
          );
        }
        return [...c, { ...item, qty: 1 }];
      });
      pushToast(`Added “${item.name}” to cart`);
    },
    [setCart, pushToast]
  );

  const removeFromCart = useCallback(
    (id: string) => {
      setCart((c) => c.filter((x) => x.id !== id));
      pushToast("Removed from cart");
    },
    [setCart, pushToast]
  );

  const updateQty = useCallback(
    (id: string, qty: number) => {
      if (qty <= 0) return removeFromCart(id);
      setCart((c) => c.map((x) => (x.id === id ? { ...x, qty } : x)));
    },
    [setCart, removeFromCart]
  );

  const toggleLike = useCallback(
    (id: string) => {
      setLikes((l) => {
        const next = { ...l, [id]: !l[id] };
        if (next[id]) pushToast("Added to liked articles");
        return next;
      });
    },
    [setLikes, pushToast]
  );

  const toggleBookmark = useCallback(
    (id: string) => {
      setBookmarks((b) => {
        const next = { ...b, [id]: !b[id] };
        if (next[id]) pushToast("Saved for later");
        return next;
      });
    },
    [setBookmarks, pushToast]
  );

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0);

  const value = useMemo<UIContextValue>(
    () => ({
      theme,
      toggleTheme,
      searchOpen,
      openSearch: () => setSearchOpen(true),
      closeSearch: () => setSearchOpen(false),
      cartOpen,
      openCart: () => setCartOpen(true),
      closeCart: () => setCartOpen(false),
      cart,
      addToCart,
      removeFromCart,
      updateQty,
      cartCount,
      cartTotal,
      activeArticle,
      openArticle: setActiveArticle,
      closeArticle: () => setActiveArticle(null),
      likes,
      toggleLike,
      bookmarks,
      toggleBookmark,
      toasts,
      pushToast,
      mobileNavOpen,
      setMobileNavOpen,
    }),
    [
      theme,
      toggleTheme,
      searchOpen,
      cartOpen,
      cart,
      addToCart,
      removeFromCart,
      updateQty,
      cartCount,
      cartTotal,
      activeArticle,
      likes,
      toggleLike,
      bookmarks,
      toggleBookmark,
      toasts,
      pushToast,
      mobileNavOpen,
    ]
  );

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}

export function useUI() {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error("useUI must be used within UIProvider");
  return ctx;
}

export { PRODUCTS };
