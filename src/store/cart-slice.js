import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
    changed: false,
  },
  reducers: {
    replaceCart(state, action) {
      // state = action.payload; turns out you can't replace the entire state directly
      state.items = action.payload.items || []; //because for firebase, if the kayvalue have a empty array, it will be removed completely. this will cause error when fetched back at the start
      state.totalQuantity = action.payload.totalQuantity;
    },

    addItemsToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);

      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          price: +newItem.price,
          quantity: 1,
          totalPrice: +newItem.price,
          name: newItem.title,
        });

        state.totalQuantity++;
        state.changed = true;
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + existingItem.price;
        state.totalQuantity++;
        state.changed = true;
      }
    },
    removeItemsFromCart(state, action) {
      const itemId = action.payload.id;
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === itemId
      );
      const existingItem = state.items[existingItemIndex];
      if (existingItem.quantity > 1) {
        existingItem.quantity--;
        state.totalQuantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
        state.changed = true;
      } else {
        state.items.splice(existingItemIndex, 1);
        state.totalQuantity--;
        state.changed = true;
      }
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
