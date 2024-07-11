import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import { formatCurrency } from "../../utilities/helpers";
import {
  decreaseItemQuantity,
  deleteItem,
  increaseItemQuantity,
} from "./cartSlice";

function CartItem({ item }) {
  const { name, quantity, totalPrice } = item;

  const dispatch = useDispatch();

  function handleIncrease(e) {
    e.preventDefault();
    dispatch(increaseItemQuantity(item.id));
  }
  function handleDecrease(e) {
    e.preventDefault();
    dispatch(decreaseItemQuantity(item.id));
  }

  function handleDelete(e) {
    e.preventDefault();
    dispatch(deleteItem(item.id));
  }

  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between">
      <p className="mb-1 sm:mb-0">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between sm:gap-6">
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>
        <div className="flex items-center gap-2 md:gap-3">
          <Button type="round" onClick={handleDecrease}>
            -
          </Button>
          <p className="text-sm font-medium">{quantity}</p>
          <Button type="round" onClick={handleIncrease}>
            +
          </Button>
        </div>
        <Button type="small" onClick={handleDelete}>
          Delete
        </Button>
      </div>
    </li>
  );
}

export default CartItem;
