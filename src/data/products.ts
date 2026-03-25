export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  author: string;
}

export interface Category {
  id: number;
  name: string;
  image: string;
  description: string;
}

export const FEATURED_PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Classic Black Hoodie',
    price: 129.99,
    image: 'https://images.pexels.com/photos/3622622/pexels-photo-3622622.jpeg',
    category: 'Hoodies',
  },
  {
    id: 2,
    name: 'Oversized Streetwear T-Shirt',
    price: 59.99,
    image: 'https://images.pexels.com/photos/3622619/pexels-photo-3622619.jpeg',
    category: 'T-Shirts',
  },
  {
    id: 3,
    name: 'Urban Black Cargo Pants',
    price: 149.99,
    image: 'https://images.pexels.com/photos/3622607/pexels-photo-3622607.jpeg',
    category: 'Pants',
  },
  {
    id: 4,
    name: 'Limited Edition Sneakers',
    price: 189.99,
    image: 'https://images.pexels.com/photos/3622609/pexels-photo-3622609.jpeg',
    category: 'Shoes',
  },
  {
    id: 5,
    name: 'Tactical Jacket',
    price: 199.99,
    image: 'https://images.pexels.com/photos/3622614/pexels-photo-3622614.jpeg',
    category: 'Jackets',
  },
  {
    id: 6,
    name: 'Urban Backpack',
    price: 99.99,
    image: 'https://images.pexels.com/photos/3622611/pexels-photo-3622611.jpeg',
    category: 'Accessories',
  },
];

export const CATEGORIES: Category[] = [
  {
    id: 1,
    name: 'Hoodies & Sweatshirts',
    image: 'https://images.pexels.com/photos/3622622/pexels-photo-3622622.jpeg',
    description: 'Cozy streetwear essentials',
  },
  {
    id: 2,
    name: 'T-Shirts & Tops',
    image: 'https://images.pexels.com/photos/3622619/pexels-photo-3622619.jpeg',
    description: 'Express your style',
  },
  {
    id: 3,
    name: 'Pants & Bottoms',
    image: 'https://images.pexels.com/photos/3622607/pexels-photo-3622607.jpeg',
    description: 'Perfect fit, bold design',
  },
  {
    id: 4,
    name: 'Footwear',
    image: 'https://images.pexels.com/photos/3622609/pexels-photo-3622609.jpeg',
    description: 'Step up your game',
  },
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    title: 'How to Style Oversized Pieces Like a Pro',
    excerpt: 'Master the art of oversized fashion with our expert styling tips and tricks...',
    image: 'https://images.pexels.com/photos/3622612/pexels-photo-3622612.jpeg',
    date: 'March 20, 2026',
    author: 'Style Team',
  },
  {
    id: 2,
    title: 'The Ultimate Streetwear Essentials Guide',
    excerpt: 'Learn about the must-have pieces that define modern streetwear culture...',
    image: 'https://images.pexels.com/photos/3622615/pexels-photo-3622615.jpeg',
    date: 'March 15, 2026',
    author: 'Fashion Expert',
  },
  {
    id: 3,
    title: 'Spring Collab: Limited Edition Drop',
    excerpt: 'Discover our exclusive collaboration with top designers. Limited pieces only...',
    image: 'https://images.pexels.com/photos/3622620/pexels-photo-3622620.jpeg',
    date: 'March 10, 2026',
    author: 'Brand Updates',
  },
];
