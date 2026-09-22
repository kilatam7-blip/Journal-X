import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Categories from "./components/Categories";
import PopularNow from "./components/PopularNow";
import Shop from "./components/Shop";
import Library from "./components/Library";
import Newsletter from "./components/Newsletter";
import Footer from "./components/Footer";
import SearchModal from "./components/SearchModal";
import CartDrawer from "./components/CartDrawer";
import ArticleReader from "./components/ArticleReader";
import MobileNav from "./components/MobileNav";
import { Toasts } from "./components/Overlays";
import { ReadingProgressBar, BackToTop } from "./components/Chrome";

export default function App() {
  return (
    <div className="min-h-screen bg-[#0d0a07] text-[#f5efe7]">
      <ReadingProgressBar />
      <Navbar />
      <main>
        <Hero />
        <Categories />
        <PopularNow />
        <Shop />
        <Library />
        <Newsletter />
      </main>
      <Footer />

      {/* Overlays */}
      <MobileNav />
      <SearchModal />
      <CartDrawer />
      <ArticleReader />
      <Toasts />
      <BackToTop />
    </div>
  );
}
