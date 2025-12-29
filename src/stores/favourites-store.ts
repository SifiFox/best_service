import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type FavouriteItem = {
  id: number;
  img: string;
  title: string;
  price: number;
  slug: string; // Добавляем slug для навигации
};

type FavouritesStore = {
  items: FavouriteItem[];
  addItem: (item: FavouriteItem) => void;
  removeItem: (id: number) => void;
  clearFavourites: () => void;
  isItemFavourite: (id: number) => boolean;
  getTotalItems: () => number;
};

export const useFavouritesStore = create<FavouritesStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: newItem => {
        const existingItem = get().items.find(item => item.id === newItem.id);

        if (!existingItem) {
          set(state => ({
            items: [...state.items, newItem],
          }));
        }
      },

      removeItem: id => {
        set(state => ({
          items: state.items.filter(item => item.id !== id),
        }));
      },

      clearFavourites: () => {
        set({ items: [] });
      },

      isItemFavourite: id => {
        return get().items.some(item => item.id === id);
      },

      getTotalItems: () => {
        return get().items.length;
      },
    }),
    {
      name: 'favourites-storage',
    }
  )
);
