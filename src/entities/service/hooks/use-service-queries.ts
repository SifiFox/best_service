'use client';

// Ключи для кэша React Query
export const serviceKeys = {
  all: ['services'] as const,
  categories: () => [...serviceKeys.all, 'categories'] as const,
  category: (slug: string) => [...serviceKeys.all, 'category', slug] as const,
  detail: (slug: string, id: string) => [...serviceKeys.all, 'detail', slug, id] as const,
  details: (slug: string, id: string) => [...serviceKeys.all, 'details', slug, id] as const,
};
