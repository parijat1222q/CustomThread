
import type { Timestamp } from 'firebase/firestore';
import type { LucideIcon } from 'lucide-react';

// Timestamps can be Firebase Timestamp or JS Date after conversion
type DateLike = Timestamp | Date;

export interface UserProfile {
  id: string; // Firebase Auth UID
  username?: string; // Display name chosen by user
  email: string; // From Firebase Auth
  // profileImageUrl?: string; // URL to profile image in Firebase Storage
  // bio?: string;
  createdAt: DateLike;
  updatedAt: DateLike;
  // role?: 'admin' | 'creator' | 'member'; // Example roles
}

export interface Design {
  id: string; // Firestore document ID
  name: string;
  creatorId: string; // UserProfile.id of the creator
  creatorDisplayName?: string; // Denormalized for easier display on cards
  imageUrl: string; // URL to image in Firebase Storage or external
  votes: number;
  description?: string;
  tags?: string[];
  createdAt: DateLike;
  updatedAt: DateLike;
}

// Data structure for creating a new design
export type NewDesignData = Omit<Design, 'id' | 'votes' | 'createdAt' | 'updatedAt' | 'creatorDisplayName'>;


export interface Product {
  id: string; // Firestore document ID
  designId: string; // Original Design.id this product is based on
  name: string; // Usually same as Design.name
  imageUrl: string; // Usually same as Design.imageUrl
  price: number; // Price in INR (e.g., 2399.00 for ₹2399.00)
  description: string;
  category?: string; // e.g., 'Hoodies', 'T-Shirts'
  // stock?: number; // For inventory management
  // sizes?: string[]; // e.g., ['S', 'M', 'L', 'XL']
  // colors?: string[];
  createdAt: DateLike;
  updatedAt: DateLike;
}

// Data structure for creating a new product (likely from a winning design)
export type NewProductData = Omit<Product, 'id' | 'createdAt' | 'updatedAt'>;


export interface NavLink {
  href: string;
  label: string;
  icon?: LucideIcon;
}
