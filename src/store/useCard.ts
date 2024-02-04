import { persist, createJSONStorage } from "zustand/middleware";
import { IProductitem, IuseCard } from "./../types/index";
import { create } from "zustand";

export const useCard = create<IuseCard>()(
  persist(
    (set, get) => ({
      cartItems: [],
      wishListItems: [],
      addToCart: (item: IProductitem) => {
        const isExist = get().cartItems.find(
          (product) => product.id === item.id
        );
        const index = get().cartItems.findIndex(
          (product) => product.id === item.id
        );
        if (isExist) {
          let incQuantity = get().cartItems[index];
          incQuantity.quantity++;
          set((state) => ({
            cartItems: [...state.cartItems],
          }));
        } else {
          set((state) => ({
            cartItems: [...state.cartItems, item],
          }));
        }
      },
      addToWishlist: (item: IProductitem) => {
        set((state) => ({
          wishListItems: [...state.wishListItems, item],
        }));
      },
      removeFromCart: (id: number | undefined) =>
        set((state) => ({
          cartItems: state.cartItems.filter((item) => item.id !== id),
        })),
      removeFromWishlist: (id: number | undefined) =>
        set((state) => ({
          wishListItems: state.wishListItems.filter((item) => item.id !== id),
        })),
    }),
    {
      name: "items",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
