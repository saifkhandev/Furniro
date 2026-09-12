import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      // Add item to cart
      addItem: (product, quantity = 1, customization = {}) => {
        const items = get().items;
        const existingIndex = items.findIndex(
          (item) =>
            item.productId === product._id &&
            JSON.stringify(item.customization) === JSON.stringify(customization)
        );

        if (existingIndex > -1) {
          const updatedItems = [...items];
          updatedItems[existingIndex].quantity += quantity;
          set({ items: updatedItems });
        } else {
          set({
            items: [
              ...items,
              {
                productId: product._id,
                name: product.name,
                price: product.price,
                image: product.images?.[0]?.url || '',
                quantity,
                customization,
                slug: product.slug,
              },
            ],
          });
        }
      },

      // Remove item from cart
      removeItem: (productId, customization = {}) => {
        set({
          items: get().items.filter(
            (item) =>
              !(item.productId === productId &&
                JSON.stringify(item.customization) === JSON.stringify(customization))
          ),
        });
      },

      // Update item quantity
      updateQuantity: (productId, quantity, customization = {}) => {
        if (quantity <= 0) {
          get().removeItem(productId, customization);
          return;
        }

        const items = get().items.map((item) => {
          if (
            item.productId === productId &&
            JSON.stringify(item.customization) === JSON.stringify(customization)
          ) {
            return { ...item, quantity };
          }
          return item;
        });

        set({ items });
      },

      // Clear cart
      clearCart: () => set({ items: [] }),

      // Toggle cart sidebar
      toggleCart: () => set({ isOpen: !get().isOpen }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      // Get cart totals
      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },
    }),
    {
      name: 'grove-cart-storage',
    }
  )
);

export default useCartStore;
