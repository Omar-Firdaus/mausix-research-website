export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  serial: string;
  readTime: string;
};

export const blogPosts: BlogPost[] = [
  {
    slug: 'open-arm-torque-calibration',
    title: 'Open-Arm Torque Calibration Under Load',
    excerpt:
      'Field notes on bench-testing shoulder actuators for repeatable torque curves when the frame is already under partial payload.',
    date: '2026-05-28',
    serial: 'LOG-0041',
    readTime: '6 min',
  },
  {
    slug: 'mausix-h1-bringup',
    title: 'MAUSIX-H1 Bring-Up Sequence',
    excerpt:
      'The first power-on checklist for the H1 torso stack — bus enumeration, encoder sanity checks, and safe idle posture.',
    date: '2026-05-14',
    serial: 'LOG-0038',
    readTime: '8 min',
  },
  {
    slug: 'industrial-ui-for-lab-tools',
    title: 'Industrial UI Patterns for Lab Tools',
    excerpt:
      'Why we borrow console readouts and serial labeling for internal dashboards instead of default SaaS chrome.',
    date: '2026-04-30',
    serial: 'LOG-0034',
    readTime: '5 min',
  },
  {
    slug: 'wireframe-as-assembly-language',
    title: 'Wireframe as Assembly Language',
    excerpt:
      'Using sparse line drawings as the shared reference between mechanical, firmware, and ops during early integration.',
    date: '2026-04-12',
    serial: 'LOG-0029',
    readTime: '4 min',
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function formatBlogDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}
