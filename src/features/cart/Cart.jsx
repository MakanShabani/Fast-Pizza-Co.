import LinkButton from "../../ui/LinkButton";
import Button from "../../ui/Button";
import "./CartItem";
import CartItem from "./CartItem";
import EmptyCart from "./EmptyCart";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart } from "./cartSlice";
import { getUsername } from "../user/userSlice";

function Cart() {
  const username = useSelector(getUsername);

  const cart = useSelector(getCart);
  const dispatch = useDispatch();

  function handleClear(e) {
    e.preventDefault();
    dispatch(clearCart());
  }

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="px-4">
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>
      <h2 className="mt-7 text-xl font-semibold">Your cart, {username}</h2>
      <ul className="mt-3 divide-y divide-stone-200 border-b">
        {cart.map((item) => (
          <CartItem item={item} key={item.pizzaId} />
        ))}
      </ul>

      {cart.length > 0 && (
        <div className="mt-6 space-x-2">
          <Button to="/order/new">Order Pizzas</Button>
          <Button type="secondary" onClick={handleClear}>
            Clear cart
          </Button>
        </div>
      )}
    </div>
  );
}

export default Cart;
