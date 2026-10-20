import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const categories = [
  { name: 'Small Plates', slug: 'small-plates', sortOrder: 1 },
  { name: 'Mains', slug: 'mains', sortOrder: 2 },
  { name: 'Desserts', slug: 'desserts', sortOrder: 3 },
];

const menuItems = [
  {
    name: 'Wild Herb Tart',
    slug: 'wild-herb-tart',
    description: 'Seasonal greens, whipped ricotta, and a crisp pastry shell.',
    price: '18.00',
    categorySlug: 'small-plates',
    sortOrder: 1,
    isFeatured: true,
  },
  {
    name: 'Charred Octopus',
    slug: 'charred-octopus',
    description: 'Tender octopus with smoked paprika, lemon, and garden herbs.',
    price: '24.00',
    categorySlug: 'small-plates',
    sortOrder: 2,
  },
  {
    name: 'Alba Truffle Tagliolini',
    slug: 'alba-truffle-tagliolini',
    description: 'Fresh tagliolini finished with seasonal Alba truffle.',
    price: '68.00',
    categorySlug: 'mains',
    sortOrder: 1,
    isFeatured: true,
  },
  {
    name: 'AS Wagyu Tenderloin',
    slug: 'as-wagyu-tenderloin',
    description: 'Grilled wagyu tenderloin with roasted roots and pan jus.',
    price: '112.00',
    categorySlug: 'mains',
    sortOrder: 2,
  },
  {
    name: 'Valrhona Chocolate Tart',
    slug: 'valrhona-chocolate-tart',
    description: 'Dark chocolate tart with crème fraîche and cacao nib.',
    price: '19.00',
    categorySlug: 'desserts',
    sortOrder: 1,
  },
  {
    name: 'Citrus Saba',
    slug: 'citrus-saba',
    description: 'Seasonal citrus, saba syrup, and toasted pistachio.',
    price: '16.00',
    categorySlug: 'desserts',
    sortOrder: 2,
  },
];

async function main() {
  const categoryIds = new Map();

  for (const category of categories) {
    const savedCategory = await prisma.menuCategory.upsert({
      where: { slug: category.slug },
      create: category,
      update: { name: category.name, sortOrder: category.sortOrder, isActive: true },
    });
    categoryIds.set(category.slug, savedCategory.id);
  }

  for (const { categorySlug, ...item } of menuItems) {
    await prisma.menuItem.upsert({
      where: { slug: item.slug },
      create: { ...item, categoryId: categoryIds.get(categorySlug) },
      update: { ...item, categoryId: categoryIds.get(categorySlug) },
    });
  }

  console.log(`Seeded ${categories.length} menu categories and ${menuItems.length} menu items.`);
}

main()
  .catch((error) => {
    console.error('Database seed failed:', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });