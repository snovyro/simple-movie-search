import { create } from "zustand";

const store = create((set) => ({
  movieDetails: null,
  cart: [],
  setMovieDetails: (details) => set({ movieDetails: details }),
  addToCart: (movie) => set((state) => ({ cart: [...state.cart, movie] })),
  removeFromCart: (imdbID) =>
    set((state) => ({
      cart: state.cart.filter((movie) => movie.imdbID !== imdbID),
    })),
  checkoutItems: () => set({ cart: [] }),
}));

export default store;
