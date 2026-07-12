import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import {
  seedAdvantagesBody,
  seedAssetPaths,
  seedWoodTypesBody,
} from './seed-homepage-data';

const prisma = new PrismaClient();
const HERO_ID = 'homepage-hero';

async function seedAdmin(): Promise<void> {
  const email = 'admin@pixel38.com';
  const password = 'admin12345';
  const passwordHash = await bcrypt.hash(password, 12);

  await prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      email,
      passwordHash,
    },
  });

  console.log(`Seeded admin user: ${email} / ${password}`);
}

async function seedHomepage(): Promise<void> {
  await prisma.heroSection.upsert({
    where: { id: HERO_ID },
    update: {
      title: 'Solid wood products',
      subtitle: 'Oak, beech, ash from 1700 CZK per m3',
      ctaLabel: 'Order',
      ctaHref: '#contacts',
      imageUrl: seedAssetPaths.heroCollage[0],
      imageAlt: 'Solid wood furniture workshop',
    },
    create: {
      id: HERO_ID,
      title: 'Solid wood products',
      subtitle: 'Oak, beech, ash from 1700 CZK per m3',
      ctaLabel: 'Order',
      ctaHref: '#contacts',
      imageUrl: seedAssetPaths.heroCollage[0],
      imageAlt: 'Solid wood furniture workshop',
    },
  });

  const textSections = [
    {
      key: 'wood-types',
      heading: 'THE WOOD WE\nWORK WITH',
      body: JSON.stringify(seedWoodTypesBody),
      sortOrder: 0,
    },
    {
      key: 'our-work',
      heading: 'OUR WORK',
      body: '',
      sortOrder: 1,
    },
    {
      key: 'advantages',
      heading: 'ADVANTAGES\nWORKING WITH US',
      body: JSON.stringify(seedAdvantagesBody),
      sortOrder: 2,
    },
    {
      key: 'about',
      heading: 'ABOUT US',
      body: 'Founded with a passion for woodworking excellence, we have spent years perfecting the art of solid wood craftsmanship. Our workshop combines traditional hand tools with modern techniques to create furniture and interior elements that stand the test of time. We believe in sustainable practices, transparent processes, and building lasting relationships with our clients.',
      sortOrder: 3,
    },
    {
      key: 'contact',
      heading: 'ANY QUESTIONS?',
      body: '',
      sortOrder: 4,
    },
  ];

  for (const section of textSections) {
    await prisma.textSection.upsert({
      where: { key: section.key },
      update: {
        heading: section.heading,
        body: section.body,
        sortOrder: section.sortOrder,
        isPublished: true,
      },
      create: {
        ...section,
        isPublished: true,
      },
    });
  }

  await prisma.banner.deleteMany();
  const ourWorkBanners = [
    {
      title: 'Modern kitchen',
      subtitle: null,
      imageUrl: seedAssetPaths.ourWork[0],
      imageAlt: 'Modern wooden kitchen with steel faucet',
      linkHref: null,
      sortOrder: 0,
      isPublished: true,
    },
    {
      title: 'Spiral staircase',
      subtitle: null,
      imageUrl: seedAssetPaths.ourWork[1],
      imageAlt: 'Custom spiral wooden staircase interior',
      linkHref: null,
      sortOrder: 1,
      isPublished: true,
    },
    {
      title: 'Architectural staircase',
      subtitle: null,
      imageUrl: seedAssetPaths.ourWork[2],
      imageAlt: 'Architectural wooden staircase craftsmanship',
      linkHref: null,
      sortOrder: 2,
      isPublished: true,
    },
  ];

  for (const banner of ourWorkBanners) {
    await prisma.banner.create({ data: banner });
  }

  await prisma.homepageImage.deleteMany();

  const homepageImages = [
    ...seedAssetPaths.heroCollage.map((imageUrl, index) => ({
      imageUrl,
      imageAlt: [
        'Solid wood furniture assembly',
        'Handcrafted wooden table and chairs',
        'Custom spiral wooden staircase',
      ][index],
      caption: 'hero-collage',
      sortOrder: index,
      isPublished: true,
    })),
    ...seedAssetPaths.about.map((imageUrl, index) => ({
      imageUrl,
      imageAlt: [
        'Carpenter at work in the workshop',
        'Craftsman measuring wood for precision',
        'Designer drawing furniture plans on paper',
      ][index],
      caption: 'about',
      sortOrder: 10 + index,
      isPublished: true,
    })),
    {
      imageUrl: seedAssetPaths.contact,
      imageAlt: 'Tree ring cross-section showing wood grain',
      caption: 'contact',
      sortOrder: 20,
      isPublished: true,
    },
  ];

  for (const image of homepageImages) {
    await prisma.homepageImage.create({ data: image });
  }

  console.log('Seeded homepage content');
}

async function main(): Promise<void> {
  await seedAdmin();
  await seedHomepage();
}

main()
  .catch((error: unknown) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
