import { create } from "zustand";

export interface CartItem {
  id: string;
  name: string;
  sizeName?: string;
  price: number;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: string, sizeName?: string) => void;
  updateQuantity: (id: string, quantity: number, sizeName?: string) => void;
  clearCart: () => void;
  setOpen: (open: boolean) => void;
  totalCount: () => number;
  totalPrice: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  isOpen: false,
  addItem: (newItem) => {
    set((state) => {
      const existingIndex = state.items.findIndex(
        (i) => i.id === newItem.id && i.sizeName === newItem.sizeName
      );
      if (existingIndex > -1) {
        const updated = [...state.items];
        updated[existingIndex].quantity += 1;
        return { items: updated, isOpen: true };
      }
      return {
        items: [...state.items, { ...newItem, quantity: 1 }],
        isOpen: true,
      };
    });
  },
  removeItem: (id, sizeName) => {
    set((state) => ({
      items: state.items.filter(
        (i) => !(i.id === id && i.sizeName === sizeName)
      ),
    }));
  },
  updateQuantity: (id, quantity, sizeName) => {
    set((state) => {
      if (quantity <= 0) {
        return {
          items: state.items.filter(
            (i) => !(i.id === id && i.sizeName === sizeName)
          ),
        };
      }
      return {
        items: state.items.map((i) => {
          if (i.id === id && i.sizeName === sizeName) {
            return { ...i, quantity };
          }
          return i;
        }),
      };
    });
  },
  clearCart: () => set({ items: [], isOpen: false }),
  setOpen: (open) => set({ isOpen: open }),
  totalCount: () => get().items.reduce((sum, item) => sum + item.quantity, 0),
  totalPrice: () => get().items.reduce((sum, item) => sum + item.price * item.quantity, 0),
}));
