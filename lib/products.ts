export type Product = {
  id: string;
  name: string;
  serial: string;
  description: string;
  category: string;
  status: string;
  exploreHref: string;
  image?: {
    src: string;
    alt: string;
    variant?: 'dark' | 'light';
  };
};

export const products: Product[] = [
  {
    id: 'mausix-glass',
    name: 'Mausix Glass',
    serial: 'SYS-GL-001',
    description:
      'Neural smart glasses with binocular eye tracking — operator-facing telemetry, live state, and console UI for embedded systems on the bench.',
    category: 'Interface',
    status: 'In development',
    exploreHref: '/blog/mausix-glass-beta',
    image: {
      src: '/mausix-glass.png',
      alt: 'Mausix Glass wireframe',
      variant: 'light',
    },
  },
  {
    id: 'mausix-h1',
    name: 'Mausix-H1',
    serial: 'SYS-H1-001',
    description:
      'Open-arm torso — torque mapping, encoder bring-up, and repeatable idle posture under partial payload.',
    category: 'Robotics',
    status: 'Active bench',
    exploreHref: '/forms?product=mausix-h1',
    image: {
      src: '/mausix-h1-assembly.png',
      alt: 'Mausix-H1 main assembly wireframe',
      variant: 'light',
    },
  },
];
