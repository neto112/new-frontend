import { defineStore } from "pinia";
import type { IProduct } from "../interface/Product";

export const useCartStore = defineStore({
  id: "cart",
  state: () => ({
    cart: [] as IProduct[],
  }),
  getters: {
    productQuantity: (state) => (product: IProduct) => {
      const item = state.cart.find((i) => i.id === product.id);

      if (item) {
        return item.quantity;
      } else {
        return null;
      }
    },
    cartItems: (state) => {
      return state.cart;
    },
    cartTotal: (state) => {
      return state.cart.reduce((a, b) => a + b.price * b.quantity, 0);
    },
  },
  actions: {
    addToCart(product: IProduct) {
      const item = this.cart.find((i) => i.id === product.id);

      if (item) {
        item.quantity++;
      } else {
        this.cart.push({ ...product, quantity: 1 });
      }
    },

    removeFromCart(product: IProduct) {
      const item = this.cart.find((i) => i.id === product.id);

      if (item) {
        if (item.quantity > 1) {
          item.quantity--;
        } else {
          this.cart = this.cart.filter((i) => i.id !== product.id);
        }
      }
    },
    removeAllQuantityFromCart(product: IProduct) {
      const item = this.cart.find((i) => i.id === product.id);
      if (item) {
        this.cart = this.cart.filter((i) => i.id !== product.id);
      }
    },
  },
  persist: true,
});
