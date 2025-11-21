// Application constants

export const APP_NAME = 'React Template';
export const APP_DESCRIPTION =
  'Professional React template with best practices';

// URLs
export const SITE_URL =
  import.meta.env.VITE_SITE_URL || 'http://localhost:5173';
export const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

// Pagination
export const DEFAULT_PAGE_SIZE = 10;
export const MAX_PAGE_SIZE = 100;

// Local Storage Keys
export const STORAGE_KEYS = {
  THEME: 'theme',
  USER_PREFERENCES: 'user-preferences',
  AUTH_TOKEN: 'auth-token',
} as const;

// Theme
export const THEMES = ['light', 'dark', 'system'] as const;
export type Theme = (typeof THEMES)[number];

// Routes
export const ROUTES = {
  HOME: '/',
} as const;
