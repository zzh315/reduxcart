import Card from "../UI/Card";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import { useSelector } from "react-redux";

const Cart = (props) => {
  const cart = useSelector((state) => state.cart);
  const cartItems = cart.items;

  const cartContent = cartItems.map((cartItem) => {
    return (
      <CartItem
        key={cartItem.id}
        item={{
          id: cartItem.id,
          title: cartItem.name,
          quantity: cartItem.quantity,
          total: +cartItem.totalPrice,
          price: cartItem.price,
        }}
      />
    );
  });

  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <ul>{cartContent}</ul>
    </Card>
  );
};

export default Cart;
