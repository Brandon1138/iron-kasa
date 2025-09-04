export type Category = 'iphone' | 'ipad' | 'macbook' | 'imac';

export type ServiceItem = {
  name: string;
  duration: string;
  price: string;
};

export type ImageSize = { width: number; height: number };

export type ImageSizes = {
  expanded?: ImageSize;
  xl?: ImageSize;
  lg?: ImageSize;
  md?: ImageSize;
  sm: ImageSize;
};

export type Product = {
  category: Extract<Category, 'iphone' | 'ipad'>;
  slug: string;
  title: string;
  imgUrl: string;
  sizes: ImageSizes;
  services: ServiceItem[];
};

// Local slugify helper to normalize titles into URL-safe slugs
export function slugify(input: string): string {
  return input
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

// Derive typed product data from existing constants without removing them
// Note: importing from JS is supported by Next.js TypeScript transpilation
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { iPhoneServiceDetails, iPadServiceDetails } from '../../constants';

function mapDetailsToProducts(
  details: Array<{ imgUrl: string; title: string; sizes: ImageSizes; services: ServiceItem[] }>,
  category: Product['category'],
): Product[] {
  return details.map((d) => ({
    category,
    slug: slugify(d.title),
    title: d.title,
    imgUrl: d.imgUrl,
    sizes: d.sizes,
    services: d.services ?? [],
  }));
}

const iphoneProducts: Product[] = mapDetailsToProducts(iPhoneServiceDetails, 'iphone');
const ipadProducts: Product[] = mapDetailsToProducts(iPadServiceDetails, 'ipad');

export function getProductsByCategory(category: Extract<Category, 'iphone' | 'ipad'>): Product[] {
  if (category === 'iphone') return iphoneProducts;
  if (category === 'ipad') return ipadProducts;
  return [];
}

export function getProductBySlug(
  category: Extract<Category, 'iphone' | 'ipad'>,
  slug: string,
): Product | undefined {
  const list = getProductsByCategory(category);
  return list.find((p) => p.slug === slug);
}

export function getAllSlugs(category: Extract<Category, 'iphone' | 'ipad'>): string[] {
  return getProductsByCategory(category).map((p) => p.slug);
}

