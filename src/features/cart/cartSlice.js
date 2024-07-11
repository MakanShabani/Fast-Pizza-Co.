import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  // cart: [
  //   {
  //     pizzaId: 12,
  //     name: "Fake Pizza",
  //     quantity: 2,
  //     unitPrice: 16,
  //     totalPrice: 32,
  //   },
  // ],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      //payload = pizza

      if (state.cart.find((item) => item.pizzaId === action.payload.id)) return;
      const newItem = { ...action.payload };
      newItem.quantity = 1;
      newItem.totalPrice = newItem.unitPrice;

      //Updating id property of pizzas in cart => so we can use pizzaId via backend API
      // Assign new key
      newItem["pizzaId"] = newItem["id"];

      // Delete old key
      delete newItem["id"];

      state.cart.push(newItem);
    },
    deleteItem(state, action) {
      //payload = pizza id
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },
    increaseItemQuantity(state, action) {
      //payload = pizza id

      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity += 1;
      item.totalPrice = item.quantity * item.unitPrice;
    },
    decreaseItemQuantity(state, action) {
      //payload = pizza id

      const index = state.cart.findIndex(
        (item) => item.pizzaId === action.payload,
      );
      if (index < 0) return;

      const item = state.cart.at(index);

      item.quantity -= 1;
      item.totalPrice = item.quantity * item.unitPrice;

      if (item.quantity <= 0) state.cart.splice(index, 1);
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

export const {
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

//Selectors ---> Should use 'reselect Library' in large apps

export const getCart = (state) => state.cart.cart;

export const getTotalOrdersCount = (state) =>
  state.cart.cart.reduce((acc, curr) => {
    return acc + curr.quantity;
  }, 0);

export const getTotalOrdersPrice = (state) =>
  state.cart.cart.reduce((acc, curr) => {
    return acc + curr.totalPrice;
  }, 0);

export const getItemQuantity = (id) => (state) =>
  state.cart.cart.find((item) => item.pizzaId === id)?.quantity;
