import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

const CATEGORIES = [
  { name: 'Hoodies', slug: 'hoodies', image: 'https://images.pexels.com/photos/3622622/pexels-photo-3622622.jpeg', description: 'Cozy and comfortable hoodies for all seasons' },
  { name: 'T-Shirts', slug: 't-shirts', image: 'https://images.pexels.com/photos/3622619/pexels-photo-3622619.jpeg', description: 'Classic and graphic t-shirts for everyday wear' },
  { name: 'Pants', slug: 'pants', image: 'https://images.pexels.com/photos/3622607/pexels-photo-3622607.jpeg', description: 'Cargo, jeans, and all-purpose pants' },
  { name: 'Shoes', slug: 'shoes', image: 'https://images.pexels.com/photos/3622609/pexels-photo-3622609.jpeg', description: 'Sneakers, running shoes, and casual footwear' },
  { name: 'Jackets', slug: 'jackets', image: 'https://images.pexels.com/photos/3622614/pexels-photo-3622614.jpeg', description: 'Tactical, denim, and layering jackets' },
  { name: 'Accessories', slug: 'accessories', image: 'https://images.pexels.com/photos/3622611/pexels-photo-3622611.jpeg', description: 'Bags, beanies, and street-style accessories' },
];

const PRODUCTS: Array<{
  slug: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  categorySlug: string;
  description: string;
  sku: string;
  sizes: string[];
  colors: string[];
  tags: string[];
  badges: string[];
  rating: number;
  reviewCount: number;
}> = [
  {
    slug: 'prod-001',
    name: 'Classic Black Hoodie',
    price: 129.99,
    originalPrice: 149.99,
    image: 'https://images.pexels.com/photos/3622622/pexels-photo-3622622.jpeg',
    images: [
      'https://images.pexels.com/photos/3622622/pexels-photo-3622622.jpeg',
      'https://images.pexels.com/photos/3622619/pexels-photo-3622619.jpeg',
      'https://images.pexels.com/photos/3622607/pexels-photo-3622607.jpeg',
    ],
    categorySlug: 'hoodies',
    description: 'Premium oversized black hoodie with embroidered DRIPCODE logo. Perfect for everyday streetwear. Comfortable and durable.',
    sku: 'SKU-PROD-001',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'White', 'Gray', 'Navy'],
    tags: ['oversized', 'comfortable', 'casual'],
    badges: ['Sale'],
    rating: 4.8,
    reviewCount: 156,
  },
  {
    slug: 'prod-002',
    name: 'Oversized Streetwear T-Shirt',
    price: 59.99,
    image: 'https://images.pexels.com/photos/3622619/pexels-photo-3622619.jpeg',
    images: [
      'https://images.pexels.com/photos/3622619/pexels-photo-3622619.jpeg',
      'https://images.pexels.com/photos/3622622/pexels-photo-3622622.jpeg',
    ],
    categorySlug: 't-shirts',
    description: 'Vintage-inspired oversized t-shirt with unique graphic print. Made from 100% organic cotton.',
    sku: 'SKU-PROD-002',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'White', 'Cream', 'Charcoal'],
    tags: ['graphic', 'vintage', 'organic'],
    badges: ['New'],
    rating: 4.6,
    reviewCount: 89,
  },
  {
    slug: 'prod-003',
    name: 'Urban Black Cargo Pants',
    price: 149.99,
    originalPrice: 179.99,
    image: 'https://images.pexels.com/photos/3622607/pexels-photo-3622607.jpeg',
    images: [
      'https://images.pexels.com/photos/3622607/pexels-photo-3622607.jpeg',
      'https://images.pexels.com/photos/3622622/pexels-photo-3622622.jpeg',
    ],
    categorySlug: 'pants',
    description: 'Multi-pocket cargo pants with adjustable waistband. Perfect for tech-forward street style. Water-resistant fabric.',
    sku: 'SKU-PROD-003',
    sizes: ['28', '30', '32', '34', '36', '38'],
    colors: ['Black', 'Olive', 'Gray', 'Navy'],
    tags: ['cargo', 'utility', 'tech'],
    badges: ['Sale'],
    rating: 4.7,
    reviewCount: 124,
  },
  {
    slug: 'prod-004',
    name: 'Limited Edition Sneakers',
    price: 189.99,
    image: 'https://images.pexels.com/photos/3622609/pexels-photo-3622609.jpeg',
    images: [
      'https://images.pexels.com/photos/3622609/pexels-photo-3622609.jpeg',
      'https://images.pexels.com/photos/3622622/pexels-photo-3622622.jpeg',
    ],
    categorySlug: 'shoes',
    description: 'Exclusive limited edition collaborative sneakers. Premium leather and sustainable materials. Only 500 pairs worldwide.',
    sku: 'SKU-PROD-004',
    sizes: ['6', '7', '8', '9', '10', '11', '12', '13'],
    colors: ['Black/White', 'All White', 'All Black'],
    tags: ['limited', 'collaboration', 'premium'],
    badges: ['Limited'],
    rating: 4.9,
    reviewCount: 203,
  },
  {
    slug: 'prod-005',
    name: 'Tactical Jacket',
    price: 199.99,
    image: 'https://images.pexels.com/photos/3622614/pexels-photo-3622614.jpeg',
    images: ['https://images.pexels.com/photos/3622614/pexels-photo-3622614.jpeg'],
    categorySlug: 'jackets',
    description: 'Functional tactical jacket with multiple utility pockets. Windproof and water-resistant. Perfect for urban adventures.',
    sku: 'SKU-PROD-005',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'Olive', 'Tan', 'Navy'],
    tags: ['tactical', 'functional', 'weather-resistant'],
    badges: [],
    rating: 4.5,
    reviewCount: 98,
  },
  {
    slug: 'prod-006',
    name: 'Urban Backpack',
    price: 99.99,
    image: 'https://images.pexels.com/photos/3622611/pexels-photo-3622611.jpeg',
    images: ['https://images.pexels.com/photos/3622611/pexels-photo-3622611.jpeg'],
    categorySlug: 'accessories',
    description: '30L capacity backpack with laptop compartment. Anti-theft design with USB charging port.',
    sku: 'SKU-PROD-006',
    sizes: ['One Size'],
    colors: ['Black', 'Gray', 'Navy'],
    tags: ['travel', 'tech-friendly', 'durable'],
    badges: [],
    rating: 4.4,
    reviewCount: 167,
  },
  {
    slug: 'prod-007',
    name: 'Vintage Denim Jacket',
    price: 129.99,
    image: 'https://images.pexels.com/photos/3622615/pexels-photo-3622615.jpeg',
    images: ['https://images.pexels.com/photos/3622615/pexels-photo-3622615.jpeg'],
    categorySlug: 'jackets',
    description: 'Classic vintage-wash denim jacket with custom embroidery. Perfect layering piece for any season.',
    sku: 'SKU-PROD-007',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Light Blue', 'Medium Blue', 'Dark Blue', 'Black'],
    tags: ['vintage', 'denim', 'classic'],
    badges: [],
    rating: 4.7,
    reviewCount: 145,
  },
  {
    slug: 'prod-008',
    name: 'Performance Running Shoes',
    price: 159.99,
    image: 'https://images.pexels.com/photos/3622620/pexels-photo-3622620.jpeg',
    images: ['https://images.pexels.com/photos/3622620/pexels-photo-3622620.jpeg'],
    categorySlug: 'shoes',
    description: 'Lightweight running shoes with advanced cushioning technology. Engineered for comfort and performance.',
    sku: 'SKU-PROD-008',
    sizes: ['6', '7', '8', '9', '10', '11', '12'],
    colors: ['Black/Red', 'White/Blue', 'Gray/Orange'],
    tags: ['performance', 'running', 'tech'],
    badges: [],
    rating: 4.6,
    reviewCount: 112,
  },
  {
    slug: 'prod-009',
    name: 'Graphic T-Shirt Bundle',
    price: 79.99,
    originalPrice: 99.99,
    image: 'https://images.pexels.com/photos/3622622/pexels-photo-3622622.jpeg',
    images: ['https://images.pexels.com/photos/3622622/pexels-photo-3622622.jpeg'],
    categorySlug: 't-shirts',
    description: 'Pack of 3 premium graphic t-shirts. Mix and match designs. Perfect starter collection.',
    sku: 'SKU-PROD-009',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Mix'],
    tags: ['bundle', 'value', 'graphic'],
    badges: ['Sale'],
    rating: 4.5,
    reviewCount: 87,
  },
  {
    slug: 'prod-010',
    name: 'Canvas Slip-On Sneakers',
    price: 79.99,
    image: 'https://images.pexels.com/photos/3622619/pexels-photo-3622619.jpeg',
    images: ['https://images.pexels.com/photos/3622619/pexels-photo-3622619.jpeg'],
    categorySlug: 'shoes',
    description: 'Casual canvas sneakers perfect for everyday wear. Comfortable and versatile. Available in multiple colors.',
    sku: 'SKU-PROD-010',
    sizes: ['6', '7', '8', '9', '10', '11', '12'],
    colors: ['Black', 'White', 'Navy', 'Gray'],
    tags: ['casual', 'canvas', 'versatile'],
    badges: [],
    rating: 4.3,
    reviewCount: 156,
  },
  {
    slug: 'prod-011',
    name: 'Premium Wool Beanie',
    price: 39.99,
    image: 'https://images.pexels.com/photos/3622607/pexels-photo-3622607.jpeg',
    images: ['https://images.pexels.com/photos/3622607/pexels-photo-3622607.jpeg'],
    categorySlug: 'accessories',
    description: 'Merino wool beanie for cold weather. Soft, durable, and moisture-wicking. Perfect for winter style.',
    sku: 'SKU-PROD-011',
    sizes: ['One Size'],
    colors: ['Black', 'White', 'Gray', 'Navy', 'Maroon'],
    tags: ['wool', 'winter', 'warm'],
    badges: [],
    rating: 4.6,
    reviewCount: 203,
  },
  {
    slug: 'prod-012',
    name: 'Utility Belt Bag',
    price: 69.99,
    image: 'https://images.pexels.com/photos/3622611/pexels-photo-3622611.jpeg',
    images: ['https://images.pexels.com/photos/3622611/pexels-photo-3622611.jpeg'],
    categorySlug: 'accessories',
    description: 'Practical utility belt bag with multiple compartments. Water-resistant material. Hands-free carrying solution.',
    sku: 'SKU-PROD-012',
    sizes: ['One Size'],
    colors: ['Black', 'Olive', 'Navy'],
    tags: ['utility', 'practical', 'functional'],
    badges: [],
    rating: 4.4,
    reviewCount: 94,
  },
  {
    slug: 'prod-013',
    name: 'Heavyweight Pullover Hoodie',
    price: 109.99,
    image: 'https://images.pexels.com/photos/3622622/pexels-photo-3622622.jpeg',
    images: ['https://images.pexels.com/photos/3622622/pexels-photo-3622622.jpeg'],
    categorySlug: 'hoodies',
    description: 'Heavyweight 400gsm pullover hoodie with kangaroo pocket. Double-stitched seams for durability. Relaxed fit.',
    sku: 'SKU-PROD-013',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'Charcoal', 'Forest Green'],
    tags: ['heavyweight', 'durable', 'relaxed-fit'],
    badges: ['New'],
    rating: 4.7,
    reviewCount: 42,
  },
];

async function main() {
  console.log('=== SEED START ===');

  // 1. Create admin user
  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'admin123',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
      joinDate: 'January 1, 2026',
      role: 'ADMIN',
    },
  });
  console.log(`PASS: Admin user created (id=${admin.id})`);

  // 2. Create regular users
  await prisma.user.upsert({
    where: { email: 'john@example.com' },
    update: {},
    create: {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
      avatar: 'https://images.pexels.com/photos/428364/pexels-photo-428364.jpeg',
      joinDate: 'January 15, 2026',
      role: 'USER',
    },
  });

  await prisma.user.upsert({
    where: { email: 'jane@example.com' },
    update: {},
    create: {
      name: 'Jane Smith',
      email: 'jane@example.com',
      password: 'password123',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
      joinDate: 'February 20, 2026',
      role: 'USER',
    },
  });
  console.log('PASS: Regular users created');

  // 3. Create categories
  const categoryMap = new Map<string, string>();
  for (const cat of CATEGORIES) {
    const created = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
    categoryMap.set(cat.slug, created.id);
  }
  console.log(`PASS: ${CATEGORIES.length} categories created`);

  // 4. Create products with variants and images
  for (const prod of PRODUCTS) {
    const categoryId = categoryMap.get(prod.categorySlug);
    if (!categoryId) {
      console.log(`FAIL: Category "${prod.categorySlug}" not found for product "${prod.slug}"`);
      process.exit(1);
    }

    const product = await prisma.product.upsert({
      where: { slug: prod.slug },
      update: {},
      create: {
        slug: prod.slug,
        name: prod.name,
        price: prod.price,
        originalPrice: prod.originalPrice,
        image: prod.image,
        description: prod.description,
        sku: prod.sku,
        rating: prod.rating,
        reviewCount: prod.reviewCount,
        tags: prod.tags,
        badges: prod.badges,
        isActive: true,
        categoryId,
        createdById: admin.id,
      },
    });

    // Create images
    for (let i = 0; i < prod.images.length; i++) {
      await prisma.productImage.upsert({
        where: {
          id: `img-${prod.slug}-${i}`,
        },
        update: {},
        create: {
          id: `img-${prod.slug}-${i}`,
          productId: product.id,
          url: prod.images[i]!,
          alt: `${prod.name} image ${i + 1}`,
          sortOrder: i,
        },
      });
    }

    // Create variants (size x color)
    for (const size of prod.sizes) {
      for (const color of prod.colors) {
        const stock = Math.floor(Math.random() * 50) + 10;
        await prisma.productVariant.upsert({
          where: {
            productId_size_color: {
              productId: product.id,
              size,
              color,
            },
          },
          update: {},
          create: {
            productId: product.id,
            size,
            color,
            stock,
            isActive: true,
          },
        });
      }
    }

    console.log(`PASS: Product "${prod.slug}" seeded with ${prod.images.length} images, ${prod.sizes.length * prod.colors.length} variants`);
  }

  // 5. Create reviews
  const reviewsData = [
    { productSlug: 'prod-001', author: 'Alex M.', rating: 5, title: 'Best hoodie ever!', content: 'Super comfortable and the quality is amazing.', date: 'March 18, 2026', verified: true },
    { productSlug: 'prod-001', author: 'Jordan K.', rating: 4, title: 'Great quality, runs small', content: 'Love the material but mine fitted small.', date: 'March 15, 2026', verified: true },
    { productSlug: 'prod-001', author: 'Casey R.', rating: 5, title: 'Perfect streetwear piece', content: 'This is exactly what I was looking for.', date: 'March 10, 2026', verified: true },
    { productSlug: 'prod-004', author: 'Morgan L.', rating: 5, title: 'Worth every penny', content: 'Limited edition sneakers are incredible.', date: 'March 12, 2026', verified: true },
    { productSlug: 'prod-004', author: 'Taylor N.', rating: 4, title: 'Loved them but pricey', content: 'Beautiful sneakers with amazing attention to detail.', date: 'March 8, 2026', verified: true },
  ];

  for (const review of reviewsData) {
    const product = await prisma.product.findUnique({ where: { slug: review.productSlug } });
    if (product) {
      await prisma.review.create({
        data: {
          productId: product.id,
          author: review.author,
          rating: review.rating,
          title: review.title,
          content: review.content,
          date: review.date,
          verified: review.verified,
        },
      });
    }
  }
  console.log(`PASS: ${reviewsData.length} reviews created`);

  console.log('=== SEED COMPLETE ===');
}

main()
  .catch((e) => {
    console.error('FAIL: Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
