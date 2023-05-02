import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
  },
  reducers: {
    addItemsToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      console.log("inCartSlicenewItem", newItem);
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          price: +newItem.price,
          quantity: 1,
          totalPrice: +newItem.price,
          name: newItem.title,
        });

        state.totalQuantity++;
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + existingItem.price;
        state.totalQuantity++;
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
      } else {
        state.items.splice(existingItemIndex, 1);
        state.totalQuantity--;
      }
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
