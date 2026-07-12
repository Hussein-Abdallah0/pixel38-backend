/** Asset paths aligned with frontend /public/assets */
export const seedAssetPaths = {
  heroCollage: [
    '/assets/image.jpg',
    '/assets/image-2.jpg',
    '/assets/image-1.jpg',
  ],
  woodTypes: [
    '/assets/pale-oak-wood-texture-design-background%201.jpg',
    '/assets/wood-texture-design-decoration%201.jpg',
    '/assets/old-wood-grain-background%202.jpg',
  ],
  ourWork: [
    '/assets/modern-wooden-kitchen-interior-steel-kitchen-faucet%202.jpg',
    '/assets/image-1.jpg',
    '/assets/video.jpg',
  ],
  advantages: '/assets/video.jpg',
  about: [
    '/assets/portrait-young-motivated-carpenter-standing-by-woodworking-machine-his-carpentry-workshop%201.jpg',
    '/assets/person-taking-measures-wood%201.jpg',
    '/assets/cropped-man-wearing-blue-overall-drawing-furniture-sheet-paper%201.jpg',
  ],
  contact: '/assets/image-3.jpg',
} as const;

export const seedWoodTypesBody = {
  woods: [
    {
      name: 'Oak',
      imageUrl: seedAssetPaths.woodTypes[0],
      features: [
        { text: 'Durability', positive: true },
        { text: 'Beautiful texture', positive: true },
        { text: 'Water resistance', positive: true },
        { text: 'Expensive', positive: false },
      ],
    },
    {
      name: 'Ash',
      imageUrl: seedAssetPaths.woodTypes[1],
      features: [
        { text: 'Durability', positive: true },
        { text: 'Hard to handle', positive: false },
      ],
    },
    {
      name: 'Beech',
      imageUrl: seedAssetPaths.woodTypes[2],
      features: [
        { text: 'Durability', positive: true },
        { text: 'Hard to handle', positive: false },
      ],
    },
  ],
};

export const seedAdvantagesBody = {
  imageUrl: seedAssetPaths.advantages,
  imageAlt: 'Custom wooden staircase craftsmanship',
  lines: [
    'In-house carpentry production',
    'We only treat wood with environmentally friendly and safe products',
    'Prices from the manufacturer, no extra charges',
  ],
  ctaLabel: 'Receive a consultation',
  ctaHref: '#contacts',
};
