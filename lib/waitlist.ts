import { products } from './products';

export type WaitlistInterest = {
  id: string;
  label: string;
  serial: string;
};

export const waitlistInterests: WaitlistInterest[] = [
  {
    id: 'general',
    label: 'Mausix Research',
    serial: 'SYS-MR-001',
  },
  ...products.map((product) => ({
    id: product.id,
    label: product.name,
    serial: product.serial,
  })),
];

export function getWaitlistInterest(id: string | undefined): WaitlistInterest {
  return waitlistInterests.find((interest) => interest.id === id) ?? waitlistInterests[0];
}

export function isValidWaitlistInterest(id: string): boolean {
  return waitlistInterests.some((interest) => interest.id === id);
}
