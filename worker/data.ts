import {
  EXPORT_COMMODITIES,
  INITIAL_BLOG_POSTS,
  INITIAL_GALLERY,
  INITIAL_INQUIRIES,
  INITIAL_SEO_SETTINGS,
  GLOBAL_COUNTRIES,
  COURIER_PARTNERS
} from '../src/data/initialData';
import { ExportCommodity, BlogPost, GalleryItem, ContactInquiry, SEOSettings } from '../src/types';

// In-worker dynamic state caches
export let workerCommodities: ExportCommodity[] = [...EXPORT_COMMODITIES];
export let workerBlogPosts: BlogPost[] = [...INITIAL_BLOG_POSTS];
export let workerGalleryItems: GalleryItem[] = [...INITIAL_GALLERY];
export let workerInquiries: ContactInquiry[] = [...INITIAL_INQUIRIES];
export let workerSeoSettings: SEOSettings = { ...INITIAL_SEO_SETTINGS };

export const workerCountries = GLOBAL_COUNTRIES;
export const workerCouriers = COURIER_PARTNERS;
