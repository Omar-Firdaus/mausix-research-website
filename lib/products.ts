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
      'Operator-facing telemetry surface for lab instrumentation — serial readouts, live state, and console UI built for embedded systems on the bench.',
    category: 'Interface',
    status: 'In development',
    exploreHref: '#',
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
      'Open-arm torso assembly for actuator integration — torque mapping, encoder bring-up, and repeatable idle posture under partial payload.',
    category: 'Robotics',
    status: 'Active bench',
    exploreHref: '/blog/mausix-h1-bringup',
    image: {
      src: '/mausix-h1-assembly.png',
      alt: 'Mausix-H1 main assembly wireframe',
      variant: 'light',
    },
  },
];
