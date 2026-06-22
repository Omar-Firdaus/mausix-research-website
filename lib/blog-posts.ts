export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  serial: string;
  readTime: string;
  paragraphs: string[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: 'mausix-glass-beta',
    title: 'Mausix Glass Enters Beta',
    excerpt:
      'Mausix Glass — neural smart glasses with binocular eye tracking — is opening a limited beta for lab partners and early operators.',
    date: '2026-06-15',
    serial: 'LOG-0001',
    readTime: '3 min',
    paragraphs: [
      'Mausix Research is opening a limited beta for Mausix Glass, our neural smart glasses with binocular eye tracking built for physical-system research on the bench.',
      'The beta stack pairs operator-facing telemetry, live system state, and a console-style readout surface with embedded eye-tracking hardware. The goal is a single wearable channel between what you are looking at in the lab and what your instrumentation stack reports back.',
      'Beta units are intended for partners running repeated bring-up sessions, hardware-in-the-loop tests, and early neural-interface experiments. We are prioritizing teams who can commit weekly feedback and tolerate fast firmware revisions.',
      'If you want access, join the waitlist and select Mausix Glass. We will reach out as cohorts open with bench requirements, shipping windows, and onboarding docs.',
    ],
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
