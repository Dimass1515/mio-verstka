/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

/**
 * Example response type for /api/demo
 */
export interface DemoResponse {
  message: string;
}

// Shared types for products and cart
export interface Product {
  id: string;
  slug: string;
  title_fr: string;
  title_en: string;
  title_ru: string;
  description_fr?: string | null;
  description_en?: string | null;
  description_ru?: string | null;
  priceCents: number;
  imageUrl?: string | null;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CartItemDTO {
  id: string;
  productId: string;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  product?: Product;
}

export interface CartDTO {
  id: string;
  sessionId?: string | null;
  userId?: string | null;
  items: CartItemDTO[];
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedProducts {
  items: Product[];
  total: number;
  page: number;
  pageSize: number;
}