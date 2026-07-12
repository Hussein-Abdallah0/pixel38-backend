export const swaggerExamples = {
  auth: {
    loginRequest: {
      email: 'admin@pixel38.com',
      password: 'admin12345',
    },
    tokensResponse: {
      accessToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyX2lkIiwiZW1haWwiOiJhZG1pbkBwaXhlbDM4LmNvbSIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTcwMDAwMDAwMCwiZXhwIjoxNzAwMDAwOTAwfQ.signature',
      refreshToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyX2lkIiwiZW1haWwiOiJhZG1pbkBwaXhlbDM4LmNvbSIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTcwMDAwMDAwMCwiZXhwIjoxNzAwNjA0ODAwfQ.signature',
    },
    refreshRequest: {
      refreshToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyX2lkIiwiZW1haWwiOiJhZG1pbkBwaXhlbDM4LmNvbSIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTcwMDAwMDAwMCwiZXhwIjoxNzAwNjA0ODAwfQ.signature',
    },
    userProfile: {
      id: 'cluser001abc',
      email: 'admin@pixel38.com',
      role: 'ADMIN',
      createdAt: '2026-07-11T17:30:00.000Z',
    },
  },
  service: {
    createRequest: {
      title: 'Custom Woodworking',
      description: 'Handcrafted furniture and cabinetry tailored to your space.',
      iconUrl: 'https://cdn.example.com/icons/woodwork.svg',
      sortOrder: 0,
      isPublished: true,
    },
    updateRequest: {
      title: 'Custom Woodworking & Joinery',
      isPublished: true,
    },
    response: {
      id: 'clservice001abc',
      title: 'Custom Woodworking',
      description: 'Handcrafted furniture and cabinetry tailored to your space.',
      iconUrl: 'https://cdn.example.com/icons/woodwork.svg',
      sortOrder: 0,
      isPublished: true,
      createdAt: '2026-07-11T17:30:00.000Z',
      updatedAt: '2026-07-11T17:30:00.000Z',
    },
    reorderRequest: {
      items: [
        { id: 'clservice001abc', sortOrder: 0 },
        { id: 'clservice002def', sortOrder: 1 },
      ],
    },
  },
  product: {
    createRequest: {
      name: 'Walnut Paneling',
      slug: 'walnut-paneling',
      description: 'Premium walnut wall paneling for interior spaces.',
      woodType: 'Walnut',
      sortOrder: 0,
      isPublished: true,
    },
    updateRequest: {
      description: 'Updated premium walnut wall paneling description.',
      isPublished: true,
    },
    response: {
      id: 'clproduct001abc',
      name: 'Walnut Paneling',
      slug: 'walnut-paneling',
      description: 'Premium walnut wall paneling for interior spaces.',
      woodType: 'Walnut',
      sortOrder: 0,
      isPublished: true,
      createdAt: '2026-07-11T17:30:00.000Z',
      updatedAt: '2026-07-11T17:30:00.000Z',
      images: [
        {
          id: 'climg001abc',
          productId: 'clproduct001abc',
          imageUrl: 'https://cdn.example.com/products/walnut-1.jpg',
          imageAlt: 'Walnut panel close-up',
          sortOrder: 0,
        },
      ],
    },
    reorderRequest: {
      items: [
        { id: 'clproduct001abc', sortOrder: 0 },
        { id: 'clproduct002def', sortOrder: 1 },
      ],
    },
  },
  productImage: {
    createRequest: {
      imageUrl: 'https://cdn.example.com/products/walnut-2.jpg',
      imageAlt: 'Walnut panel installed in a living room',
      sortOrder: 1,
    },
    updateRequest: {
      imageAlt: 'Updated alt text for accessibility',
      sortOrder: 0,
    },
    response: {
      id: 'climg001abc',
      productId: 'clproduct001abc',
      imageUrl: 'https://cdn.example.com/products/walnut-1.jpg',
      imageAlt: 'Walnut panel close-up',
      sortOrder: 0,
    },
    reorderRequest: {
      items: [
        { id: 'climg002def', sortOrder: 0 },
        { id: 'climg001abc', sortOrder: 1 },
      ],
    },
  },
  homepage: {
    response: {
      hero: {
        id: 'homepage-hero',
        title: 'Solid wood products',
        subtitle: 'Oak, beech, ash from 1700 CZK per m3',
        ctaLabel: 'Order',
        ctaHref: '#contacts',
        imageUrl: 'https://cdn.example.com/hero.jpg',
        imageAlt: 'Solid wood furniture workshop',
        updatedAt: '2026-07-11T17:30:00.000Z',
      },
      banners: [
        {
          id: 'clbanner001abc',
          title: 'Summer Collection',
          subtitle: 'New arrivals in oak and walnut',
          imageUrl: 'https://cdn.example.com/banners/summer.jpg',
          imageAlt: 'Summer wood collection banner',
          linkHref: '/products?collection=summer',
          sortOrder: 0,
          isPublished: true,
          createdAt: '2026-07-11T17:30:00.000Z',
          updatedAt: '2026-07-11T17:30:00.000Z',
        },
      ],
      textSections: [
        {
          id: 'cltext001abc',
          key: 'about',
          heading: 'About Our Craft',
          body: 'We source sustainable hardwoods and craft each piece by hand.',
          sortOrder: 0,
          isPublished: true,
          createdAt: '2026-07-11T17:30:00.000Z',
          updatedAt: '2026-07-11T17:30:00.000Z',
        },
      ],
      images: [
        {
          id: 'clhomeimg001abc',
          imageUrl: 'https://cdn.example.com/home/gallery-1.jpg',
          imageAlt: 'Hand-planed oak surface',
          caption: 'Workshop detail',
          sortOrder: 0,
          isPublished: true,
          createdAt: '2026-07-11T17:30:00.000Z',
          updatedAt: '2026-07-11T17:30:00.000Z',
        },
      ],
    },
    patchRequest: {
      hero: {
        title: 'Solid wood products',
        subtitle: 'Oak, beech, ash from 1700 CZK per m3',
        ctaLabel: 'Order',
        ctaHref: '#contacts',
        imageUrl: 'https://cdn.example.com/hero-updated.jpg',
        imageAlt: 'Updated hero image',
      },
      banners: [
        {
          id: 'clbanner001abc',
          title: 'Summer Collection 2026',
          isPublished: true,
        },
      ],
      textSections: [
        {
          id: 'cltext001abc',
          heading: 'About BIO CWT',
          body: 'In-house carpentry production with sustainable materials.',
        },
      ],
      images: [
        {
          id: 'clhomeimg001abc',
          caption: 'Updated workshop gallery caption',
        },
      ],
    },
  },
} as const;
