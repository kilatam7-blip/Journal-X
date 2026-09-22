export const images = {
  hero: "https://images.pexels.com/photos/28638863/pexels-photo-28638863.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1800",
  travel: "https://images.pexels.com/photos/14570524/pexels-photo-14570524.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=700&w=900",
  adventure: "https://images.pexels.com/photos/38325809/pexels-photo-38325809.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=700&w=900",
  gear: "https://images.pexels.com/photos/5052147/pexels-photo-5052147.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=700&w=900",
  featured: "https://images.pexels.com/photos/11702774/pexels-photo-11702774.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400",
  author: "https://images.pexels.com/photos/28686637/pexels-photo-28686637.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=400&w=400",
  popular1: "https://images.pexels.com/photos/13985982/pexels-photo-13985982.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=500",
  popular2: "https://images.pexels.com/photos/7436047/pexels-photo-7436047.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=500",
  popular3: "https://images.pexels.com/photos/28638996/pexels-photo-28638996.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=500",
};

export const categories = [
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

export const popularArticles = [
  {
    category: "Adventure",
    date: "Mar 12, 2026",
    title: "Climbing the Atlas Mountains: a slow traveler's guide to North Africa's peaks",
  },
  {
    category: "Gear",
    date: "Mar 09, 2026",
    title: "Ten essentials we never leave home without — tested across four continents",
  },
  {
    category: "Travel",
    date: "Mar 04, 2026",
    title: "How I spent 30 days off-grid in Patagonia without a phone signal or itinerary",
  },
];

export const popularList = [
  {
    title: "A weekend in the Lofoten Islands, chasing the northern lights",
    date: "Mar 21, 2026",
    image: images.popular1,
  },
  {
    title: "Why every traveler should attempt at least one solo desert trek",
    date: "Mar 18, 2026",
    image: images.popular2,
  },
  {
    title: "The art of slow travel: lessons from six months in Southeast Asia",
    date: "Mar 14, 2026",
    image: images.popular3,
  },
  {
    title: "Pack light, travel far: the minimalist kit we swear by in 2026",
    date: "Mar 10, 2026",
    image: images.popular1,
  },
];
