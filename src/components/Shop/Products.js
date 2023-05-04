import ProductItem from "./ProductItem";
import classes from "./Products.module.css";
import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cart-slice";

const products = [
  {
    id: 1,
    title: "test",
    price: 6,
    description: "This is a first product - amazing!",
  },
  {
    id: 2,
    title: "Spoon",
    price: 2,
    description: "This is a spoon - amazing!",
  },
];
const Products = (props) => {
  const dispatch = useDispatch();

  const addCartHandler = (product) => {
    dispatch(cartActions.addItemsToCart(product));
  };

  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {products.map((product) => {
          return (
            <ProductItem
              key={product.id}
              title={product.title}
              price={product.price}
              description={product.description}
              onAddCart={() => addCartHandler(product)}
            />
          );
        })}
      </ul>
    </section>
  );
};

export default Products;
