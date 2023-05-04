import { createSlice } from "@reduxjs/toolkit";
import { uiActions } from "./ui-slice";

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

export const sendCartData = (cart) => {
  return async (dispatch) => {
    //dispatch(sendCartData()) in app.js will automatically recgonise this and pass dispatch to this returned function
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "Sending...",
        message: "Sending Cart data!",
      })
    );

    const sendRequest = async () => {
      await fetch(
        "https://react-movie-cbd13-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json",
        { method: "PUT", body: JSON.stringify(cart) }
      );
    };

    try {
      await sendRequest();
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success!",
          message: "Cart successfully sent!",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: error.message,
        })
      );
    }
  };
};

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
