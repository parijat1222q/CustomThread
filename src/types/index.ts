export interface Design {
  id: string;
  name: string;
  creator: string;
  imageUrl: string;
  votes: number;
  description?: string;
}

export interface Product {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  description: string;
  category?: string;
}

export interface NavLink {
  href: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
}
