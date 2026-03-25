// Complete product data with all details
export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[]; // For product gallery
  category: string;
  description: string;
  sizes: string[];
  colors: string[];
  tags: string[];
  badges?: string[]; // "New", "Sale", "Limited"
  rating: number;
  reviewCount: number;
}

export interface Category {
  id: number;
  name: string;
  image: string;
  description: string;
  slug: string;
}

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  author: string;
  category: string;
  slug: string;
  readTime: number; // in minutes
}

export interface Review {
  id: number;
  productId: number;
  author: string;
  rating: number;
  title: string;
  content: string;
  date: string;
  verified: boolean;
}

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
  bio: string;
}

// ============ PRODUCTS DATA ============
export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Classic Black Hoodie',
    price: 129.99,
    originalPrice: 149.99,
    image: 'https://images.pexels.com/photos/3622622/pexels-photo-3622622.jpeg',
    images: [
      'https://images.pexels.com/photos/3622622/pexels-photo-3622622.jpeg',
      'https://images.pexels.com/photos/3622619/pexels-photo-3622619.jpeg',
      'https://images.pexels.com/photos/3622607/pexels-photo-3622607.jpeg',
    ],
    category: 'Hoodies',
    description:
      'Premium oversized black hoodie with embroidered DRIPCODE logo. Perfect for everyday streetwear. Comfortable and durable.',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'White', 'Gray', 'Navy'],
    tags: ['oversized', 'comfortable', 'casual'],
    badges: ['Sale'],
    rating: 4.8,
    reviewCount: 156,
  },
  {
    id: 2,
    name: 'Oversized Streetwear T-Shirt',
    price: 59.99,
    image: 'https://images.pexels.com/photos/3622619/pexels-photo-3622619.jpeg',
    images: [
      'https://images.pexels.com/photos/3622619/pexels-photo-3622619.jpeg',
      'https://images.pexels.com/photos/3622622/pexels-photo-3622622.jpeg',
    ],
    category: 'T-Shirts',
    description:
      'Vintage-inspired oversized t-shirt with unique graphic print. Made from 100% organic cotton.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'White', 'Cream', 'Charcoal'],
    tags: ['graphic', 'vintage', 'organic'],
    badges: ['New'],
    rating: 4.6,
    reviewCount: 89,
  },
  {
    id: 3,
    name: 'Urban Black Cargo Pants',
    price: 149.99,
    originalPrice: 179.99,
    image: 'https://images.pexels.com/photos/3622607/pexels-photo-3622607.jpeg',
    images: [
      'https://images.pexels.com/photos/3622607/pexels-photo-3622607.jpeg',
      'https://images.pexels.com/photos/3622622/pexels-photo-3622622.jpeg',
    ],
    category: 'Pants',
    description:
      'Multi-pocket cargo pants with adjustable waistband. Perfect for tech-forward street style. Water-resistant fabric.',
    sizes: ['28', '30', '32', '34', '36', '38'],
    colors: ['Black', 'Olive', 'Gray', 'Navy'],
    tags: ['cargo', 'utility', 'tech'],
    badges: ['Sale'],
    rating: 4.7,
    reviewCount: 124,
  },
  {
    id: 4,
    name: 'Limited Edition Sneakers',
    price: 189.99,
    image: 'https://images.pexels.com/photos/3622609/pexels-photo-3622609.jpeg',
    images: [
      'https://images.pexels.com/photos/3622609/pexels-photo-3622609.jpeg',
      'https://images.pexels.com/photos/3622622/pexels-photo-3622622.jpeg',
    ],
    category: 'Shoes',
    description:
      'Exclusive limited edition collaborative sneakers. Premium leather and sustainable materials. Only 500 pairs worldwide.',
    sizes: ['6', '7', '8', '9', '10', '11', '12', '13'],
    colors: ['Black/White', 'All White', 'All Black'],
    tags: ['limited', 'collaboration', 'premium'],
    badges: ['Limited'],
    rating: 4.9,
    reviewCount: 203,
  },
  {
    id: 5,
    name: 'Tactical Jacket',
    price: 199.99,
    image: 'https://images.pexels.com/photos/3622614/pexels-photo-3622614.jpeg',
    images: ['https://images.pexels.com/photos/3622614/pexels-photo-3622614.jpeg'],
    category: 'Jackets',
    description:
      'Functional tactical jacket with multiple utility pockets. Windproof and water-resistant. Perfect for urban adventures.',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'Olive', 'Tan', 'Navy'],
    tags: ['tactical', 'functional', 'weather-resistant'],
    rating: 4.5,
    reviewCount: 98,
  },
  {
    id: 6,
    name: 'Urban Backpack',
    price: 99.99,
    image: 'https://images.pexels.com/photos/3622611/pexels-photo-3622611.jpeg',
    images: ['https://images.pexels.com/photos/3622611/pexels-photo-3622611.jpeg'],
    category: 'Accessories',
    description:
      '30L capacity backpack with laptop compartment. Anti-theft design with USB charging port.',
    sizes: ['One Size'],
    colors: ['Black', 'Gray', 'Navy'],
    tags: ['travel', 'tech-friendly', 'durable'],
    rating: 4.4,
    reviewCount: 167,
  },
  {
    id: 7,
    name: 'Vintage Denim Jacket',
    price: 129.99,
    image: 'https://images.pexels.com/photos/3622615/pexels-photo-3622615.jpeg',
    images: ['https://images.pexels.com/photos/3622615/pexels-photo-3622615.jpeg'],
    category: 'Jackets',
    description:
      'Classic vintage-wash denim jacket with custom embroidery. Perfect layering piece for any season.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Light Blue', 'Medium Blue', 'Dark Blue', 'Black'],
    tags: ['vintage', 'denim', 'classic'],
    rating: 4.7,
    reviewCount: 145,
  },
  {
    id: 8,
    name: 'Performance Running Shoes',
    price: 159.99,
    image: 'https://images.pexels.com/photos/3622620/pexels-photo-3622620.jpeg',
    images: ['https://images.pexels.com/photos/3622620/pexels-photo-3622620.jpeg'],
    category: 'Shoes',
    description:
      'Lightweight running shoes with advanced cushioning technology. Engineered for comfort and performance.',
    sizes: ['6', '7', '8', '9', '10', '11', '12'],
    colors: ['Black/Red', 'White/Blue', 'Gray/Orange'],
    tags: ['performance', 'running', 'tech'],
    rating: 4.6,
    reviewCount: 112,
  },
  {
    id: 9,
    name: 'Graphic T-Shirt Bundle',
    price: 79.99,
    originalPrice: 99.99,
    image: 'https://images.pexels.com/photos/3622622/pexels-photo-3622622.jpeg',
    images: ['https://images.pexels.com/photos/3622622/pexels-photo-3622622.jpeg'],
    category: 'T-Shirts',
    description:
      'Pack of 3 premium graphic t-shirts. Mix and match designs. Perfect starter collection.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Mix'],
    tags: ['bundle', 'value', 'graphic'],
    badges: ['Sale'],
    rating: 4.5,
    reviewCount: 87,
  },
  {
    id: 10,
    name: 'Canvas Slip-On Sneakers',
    price: 79.99,
    image: 'https://images.pexels.com/photos/3622619/pexels-photo-3622619.jpeg',
    images: ['https://images.pexels.com/photos/3622619/pexels-photo-3622619.jpeg'],
    category: 'Shoes',
    description:
      'Casual canvas sneakers perfect for everyday wear. Comfortable and versatile. Available in multiple colors.',
    sizes: ['6', '7', '8', '9', '10', '11', '12'],
    colors: ['Black', 'White', 'Navy', 'Gray'],
    tags: ['casual', 'canvas', 'versatile'],
    rating: 4.3,
    reviewCount: 156,
  },
  {
    id: 11,
    name: 'Premium Wool Beanie',
    price: 39.99,
    image: 'https://images.pexels.com/photos/3622607/pexels-photo-3622607.jpeg',
    images: ['https://images.pexels.com/photos/3622607/pexels-photo-3622607.jpeg'],
    category: 'Accessories',
    description:
      'Merino wool beanie for cold weather. Soft, durable, and moisture-wicking. Perfect for winter style.',
    sizes: ['One Size'],
    colors: ['Black', 'White', 'Gray', 'Navy', 'Maroon'],
    tags: ['wool', 'winter', 'warm'],
    rating: 4.6,
    reviewCount: 203,
  },
  {
    id: 12,
    name: 'Utility Belt Bag',
    price: 69.99,
    image: 'https://images.pexels.com/photos/3622611/pexels-photo-3622611.jpeg',
    images: ['https://images.pexels.com/photos/3622611/pexels-photo-3622611.jpeg'],
    category: 'Accessories',
    description:
      'Practical utility belt bag with multiple compartments. Water-resistant material. Hands-free carrying solution.',
    sizes: ['One Size'],
    colors: ['Black', 'Olive', 'Navy'],
    tags: ['utility', 'practical', 'functional'],
    rating: 4.4,
    reviewCount: 94,
  },
];

// ============ CATEGORIES DATA ============
export const CATEGORIES: Category[] = [
  {
    id: 1,
    name: 'Hoodies',
    image: 'https://images.pexels.com/photos/3622622/pexels-photo-3622622.jpeg',
    description: 'Cozy and comfortable hoodies for all seasons',
    slug: 'hoodies',
  },
  {
    id: 2,
    name: 'T-Shirts',
    image: 'https://images.pexels.com/photos/3622619/pexels-photo-3622619.jpeg',
    description: 'Classic and graphic t-shirts for everyday wear',
    slug: 't-shirts',
  },
  {
    id: 3,
    name: 'Pants',
    image: 'https://images.pexels.com/photos/3622607/pexels-photo-3622607.jpeg',
    description: 'Cargo, jeans, and all-purpose pants',
    slug: 'pants',
  },
  {
    id: 4,
    name: 'Shoes',
    image: 'https://images.pexels.com/photos/3622609/pexels-photo-3622609.jpeg',
    description: 'Sneakers, running shoes, and casual footwear',
    slug: 'shoes',
  },
  {
    id: 5,
    name: 'Jackets',
    image: 'https://images.pexels.com/photos/3622614/pexels-photo-3622614.jpeg',
    description: 'Tactical, denim, and layering jackets',
    slug: 'jackets',
  },
  {
    id: 6,
    name: 'Accessories',
    image: 'https://images.pexels.com/photos/3622611/pexels-photo-3622611.jpeg',
    description: 'Bags, beanies, and street-style accessories',
    slug: 'accessories',
  },
];

// ============ BLOG POSTS DATA ============
export const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    title: 'How to Style Oversized Pieces Like a Pro',
    excerpt: 'Master the art of oversized fashion with our expert styling tips and tricks...',
    content: `Master the art of oversized fashion with our comprehensive guide. Learn how to balance proportions, choose the right accessories, and create stunning outfits with oversized pieces.

Oversized clothing is more than just a trend—it's a lifestyle. Whether you're layering an oversized hoodie or wearing wide-leg cargo pants, the key is confidence and balance.

**Tips for success:**
1. Balance oversized tops with fitted bottoms
2. Layer strategically for dimension
3. Choose quality fabrics that drape well
4. Accessorize thoughtfully
5. Experiment with colors and textures`,
    image: 'https://images.pexels.com/photos/3622612/pexels-photo-3622612.jpeg',
    date: 'March 20, 2026',
    author: 'Style Team',
    category: 'Fashion',
    slug: 'how-to-style-oversized-pieces',
    readTime: 5,
  },
  {
    id: 2,
    title: 'The Ultimate Streetwear Essentials Guide',
    excerpt: 'Learn about the must-have pieces that define modern streetwear culture...',
    content: `Discover the essential pieces every streetwear enthusiast needs in their wardrobe. From classic hoodies to premium sneakers, we break down what makes authentic streetwear.

Streetwear has evolved from underground culture to mainstream fashion. Understanding the fundamentals is essential to building an authentic collection.

**Essential Items:**
- Black hoodie (premium quality)
- Oversized t-shirts (graphic or blank)
- Cargo pants (functional and stylish)
- Premium sneakers (limited editions)
- Baseball cap or beanie
- Utility backpack
- Accessory pieces`,
    image: 'https://images.pexels.com/photos/3622615/pexels-photo-3622615.jpeg',
    date: 'March 15, 2026',
    author: 'Fashion Expert',
    category: 'Guides',
    slug: 'ultimate-streetwear-essentials-guide',
    readTime: 7,
  },
  {
    id: 3,
    title: 'Spring Collab: Limited Edition Drop',
    excerpt: 'Discover our exclusive collaboration with top designers. Limited pieces only...',
    content: `We're excited to announce our Spring 2026 collaboration with renowned street artists and designers. This exclusive collection features limited-edition pieces you won't find anywhere else.

**What to expect:**
- 50 unique hand-designed pieces
- Collaboration with 5 top street artists
- Release date: First week of April
- Extremely limited quantities
- Pre-order available for subscribers

Mark your calendars! This collection celebrates the intersection of art and fashion.`,
    image: 'https://images.pexels.com/photos/3622620/pexels-photo-3622620.jpeg',
    date: 'March 10, 2026',
    author: 'Brand Updates',
    category: 'News',
    slug: 'spring-collab-limited-edition-drop',
    readTime: 4,
  },
  {
    id: 4,
    title: 'Sustainable Fashion: Our Eco-Friendly Initiative',
    excerpt:
      "Learn how we're reducing our carbon footprint and promoting sustainable streetwear...",
    content: `At DRIPCODE, we're committed to sustainable fashion. Learn about our eco-friendly initiatives and how you can be part of the movement.

Sustainability isn't just a buzzword—it's our responsibility. We're implementing changes across our entire supply chain.

**Our commitments:**
- 100% organic cotton by 2027
- Carbon-neutral shipping
- Recycling program for old clothes
- Fair trade partnerships
- Transparent sourcing`,
    image: 'https://images.pexels.com/photos/3622622/pexels-photo-3622622.jpeg',
    date: 'March 5, 2026',
    author: 'Sustainability Team',
    category: 'Sustainability',
    slug: 'sustainable-fashion-eco-friendly-initiative',
    readTime: 6,
  },
  {
    id: 5,
    title: 'Designer Spotlight: Meet Our Creative Team',
    excerpt: "Get to know the visionary designers behind DRIPCODE's collections...",
    content: `Meet the talented designers who create DRIPCODE's iconic collections. Learn about their inspirations, creative processes, and vision for the future of streetwear.

[Designer spotlights and interviews...]`,
    image: 'https://images.pexels.com/photos/3622619/pexels-photo-3622619.jpeg',
    date: 'February 28, 2026',
    author: 'Brand Team',
    category: 'Behind the Scenes',
    slug: 'designer-spotlight-creative-team',
    readTime: 5,
  },
  {
    id: 6,
    title: 'Sneaker Culture 101: From Courts to Streets',
    excerpt: 'Explore the evolution of sneaker culture and its influence on modern fashion...',
    content: `Sneaker culture has transformed the way we think about footwear and fashion. From basketball courts to fashion runways, sneakers have become the ultimate status symbol.

[Detailed history and cultural impact...]`,
    image: 'https://images.pexels.com/photos/3622609/pexels-photo-3622609.jpeg',
    date: 'February 15, 2026',
    author: 'Culture Writer',
    category: 'Culture',
    slug: 'sneaker-culture-courts-to-streets',
    readTime: 8,
  },
];

// ============ REVIEWS DATA ============
export const REVIEWS: Review[] = [
  {
    id: 1,
    productId: 1,
    author: 'Alex M.',
    rating: 5,
    title: 'Best hoodie ever!',
    content:
      'Super comfortable and the quality is amazing. The oversized fit is perfect. Already bought another one in white!',
    date: 'March 18, 2026',
    verified: true,
  },
  {
    id: 2,
    productId: 1,
    author: 'Jordan K.',
    rating: 4,
    title: 'Great quality, runs small',
    content:
      'Love the material but mine fitted small. I usually wear M and had to size up to L. Still 10/10 would recommend!',
    date: 'March 15, 2026',
    verified: true,
  },
  {
    id: 3,
    productId: 1,
    author: 'Casey R.',
    rating: 5,
    title: 'Perfect streetwear piece',
    content:
      'This is exactly what I was looking for. Premium quality, authentic design, and fast shipping!',
    date: 'March 10, 2026',
    verified: true,
  },
  {
    id: 4,
    productId: 4,
    author: 'Morgan L.',
    rating: 5,
    title: 'Worth every penny',
    content:
      'Limited edition sneakers are incredible. Comfortable, looks fire, and great craftsmanship. Highly recommend!',
    date: 'March 12, 2026',
    verified: true,
  },
  {
    id: 5,
    productId: 4,
    author: 'Taylor N.',
    rating: 4,
    title: 'Loved them but pricey',
    content:
      'Beautiful sneakers with amazing attention to detail. Price is steep but the quality justifies it.',
    date: 'March 8, 2026',
    verified: true,
  },
];

// ============ TEAM DATA ============
export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 1,
    name: 'Alex Chen',
    role: 'Founder & Creative Director',
    image: 'https://images.pexels.com/photos/3622622/pexels-photo-3622622.jpeg',
    bio: 'Visionary founder with 10 years of experience in fashion and streetwear culture.',
  },
  {
    id: 2,
    name: 'Jordan Williams',
    role: 'Head of Design',
    image: 'https://images.pexels.com/photos/3622619/pexels-photo-3622619.jpeg',
    bio: 'Award-winning designer passionate about creating authentic street style.',
  },
  {
    id: 3,
    name: 'Morgan Lee',
    role: 'Marketing & Community Manager',
    image: 'https://images.pexels.com/photos/3622607/pexels-photo-3622607.jpeg',
    bio: 'Expert in building engaged communities and authentic brand connections.',
  },
  {
    id: 4,
    name: 'Casey Rodriguez',
    role: 'Operations Manager',
    image: 'https://images.pexels.com/photos/3622609/pexels-photo-3622609.jpeg',
    bio: 'Logistics expert ensuring every order arrives perfectly packaged.',
  },
];

// ============ DUMMY USERS DATA ============
export interface UserData {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  joinDate: string;
  role: 'user' | 'admin';
}

export interface User extends UserData {
  password: string; // In real app, this would be hashed
}

export const DUMMY_USERS: User[] = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
    avatar: 'https://images.pexels.com/photos/428364/pexels-photo-428364.jpeg',
    joinDate: 'January 15, 2026',
    role: 'user',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: 'password123',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
    joinDate: 'February 20, 2026',
    role: 'user',
  },
  {
    id: 3,
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'admin123',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
    joinDate: 'January 1, 2026',
    role: 'admin',
  },
];
