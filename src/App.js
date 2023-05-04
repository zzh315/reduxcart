import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { sendCartData } from "./store/cart-actions";
import { fetchCartData } from "./store/cart-actions";
import Notification from "./components/UI/Notification";

let isInitial = true;

function App() {
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   const sendCartData = async () => {
  //     dispatch(
  //       uiActions.showNotification({
  //         status: "pending",
  //         title: "Sending...",
  //         message: "Sending Cart data!",
  //       })
  //     );

  //     const response = await fetch(
  //       "https://react-movie-cbd13-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json",
  //       { method: "PUT", body: JSON.stringify(cart) }
  //     );

  //     if (!response.ok) {
  //       throw new Error("Send Cart data failed");
  //     }

  //     dispatch(
  //       uiActions.showNotification({
  //         status: "success",
  //         title: "Success!",
  //         message: "Cart successfully sent!",
  //       })
  //     );
  //   };

  //   if (isInitial) {
  //     isInitial = false;
  //     return;
  //   }
  //   sendCartData().catch((error) => {
  //     dispatch(
  //       uiActions.showNotification({
  //         status: "error",
  //         title: "Error!",
  //         message: error.message,
  //       })
  //     );
  //   });
  // }, [cart, dispatch]);

  useEffect(() => {
    if (cart.changed) {
      dispatch(sendCartData(cart));
    }

    // the Action creater in cart-slice.js create sendCartData function and will return a fucntion that can be a parameter of this dispatch here, and this dispatch will pass the dispatch function to the returnd funciton
    // this way have extra steps but will keep app.js here cleaner
  }, [cart, dispatch]);

  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

  return (
    <Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
