
import type { NavLink, Design, Product } from '@/types';
import { Home, Palette, GalleryVerticalEnd, Vote, ShoppingBag, Info, User, Upload } from 'lucide-react';

export const NAV_LINKS: NavLink[] = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/design', label: 'Design', icon: Palette },
  { href: '/gallery', label: 'Gallery', icon: GalleryVerticalEnd },
  { href: '/voting', label: 'Voting', icon: Vote },
  { href: '/shop', label: 'Shop', icon: ShoppingBag },
  { href: '/about', label: 'About', icon: Info },
];

export const MOCK_FEATURED_DESIGNS: Design[] = [
  { id: '1', name: 'Cosmic Dream Hoodie', creator: 'AstroDesigner', imageUrl: 'https://placehold.co/600x700/4B0082/F0F0F0.png?text=Cosmic+Dream', votes: 1200, description: 'A hoodie inspired by the vastness of space.' },
  { id: '2', name: 'Sunset Vibes Tee', creator: 'NatureArt', imageUrl: 'https://placehold.co/600x700/8F00FF/F0F0F0.png?text=Sunset+Tee', votes: 950, description: 'Capture the warmth of a sunset with this vibrant t-shirt.' },
  { id: '3', name: 'Urban Flow Jacket', creator: 'CityScaper', imageUrl: 'https://placehold.co/600x700/333333/F0F0F0.png?text=Urban+Jacket', votes: 800, description: 'A sleek jacket for the modern urban explorer.' },
];

export const MOCK_GALLERY_DESIGNS: Design[] = [
  ...MOCK_FEATURED_DESIGNS,
  { id: '4', name: 'Retro Beats Bomber', creator: 'Vintage Vibes', imageUrl: 'https://placehold.co/600x700/FFD700/333.png?text=Retro+Bomber', votes: 750, description: 'A bomber jacket with a touch of 80s nostalgia.' },
  { id: '5', name: 'Geometric Pattern Shirt', creator: 'ShapeShifter', imageUrl: 'https://placehold.co/600x700/4682B4/FFF.png?text=Geo+Shirt', votes: 680, description: 'A smart shirt featuring an intricate geometric pattern.' },
  { id: '6', name: 'Floral Elegance Dress', creator: 'BloomDesigns', imageUrl: 'https://placehold.co/600x700/FF69B4/FFF.png?text=Floral+Dress', votes: 920, description: 'An elegant dress adorned with delicate floral prints.' },
  { id: '7', name: 'Monochrome Abstract Tee', creator: 'MinimalMind', imageUrl: 'https://placehold.co/600x700/708090/FFF.png?text=Abstract+Tee', votes: 530, description: 'A minimalist t-shirt with a striking abstract design.' },
  { id: '8', name: 'Cyberpunk Visionary Vest', creator: 'NeonByte', imageUrl: 'https://placehold.co/600x700/00FFFF/000.png?text=Cyber+Vest', votes: 1100, description: 'A futuristic vest inspired by cyberpunk aesthetics.' },
];

export const MOCK_SHOP_PRODUCTS: Product[] = [
  { id: 'shop1', name: 'Cosmic Dream Hoodie', imageUrl: 'https://placehold.co/600x700/4B0082/F0F0F0.png?text=Cosmic+Dream', price: 4799.00, description: 'Limited edition winning design. A hoodie inspired by the vastness of space, crafted from premium materials.', category: 'Hoodies' },
  { id: 'shop2', name: 'Cyberpunk Visionary Vest', imageUrl: 'https://placehold.co/600x700/00FFFF/000.png?text=Cyber+Vest', price: 6399.00, description: 'Limited edition winning design. A futuristic vest inspired by cyberpunk aesthetics, perfect for making a statement.', category: 'Vests' },
  { id: 'shop3', name: 'Floral Elegance Dress', imageUrl: 'https://placehold.co/600x700/FF69B4/FFF.png?text=Floral+Dress', price: 5599.00, description: 'Limited edition winning design. An elegant dress adorned with delicate floral prints, ideal for special occasions.', category: 'Dresses' },
  { id: 'shop4', name: 'Sunset Vibes Tee', imageUrl: 'https://placehold.co/600x700/8F00FF/F0F0F0.png?text=Sunset+Tee', price: 2399.00, description: 'Popular community design. Capture the warmth of a sunset with this vibrant t-shirt.', category: 'T-Shirts' },
];

export const HOW_IT_WORKS_STEPS = [
  { title: 'Design', description: 'Unleash your creativity with our upcoming design tool or upload your unique apparel designs.', icon: Palette },
  { title: 'Post', description: 'Share your creations with the CustomThread community by submitting them to our public gallery.', icon: Upload },
  { title: 'Vote', description: 'Browse designs from fellow creators and vote for your favorite styles to make them trend.', icon: Vote },
  { title: 'Shop', description: 'The top-voted designs become real products! Shop exclusive, community-curated apparel.', icon: ShoppingBag },
];

// Placeholder for User type if needed for frontend display
// export interface User {
//   id: string;
//   name: string;
//   email: string;
//   avatarUrl?: string;
// }
