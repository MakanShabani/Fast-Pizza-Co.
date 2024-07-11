import { formatCurrency } from "../../utilities/helpers";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  addItem,
  decreaseItemQuantity,
  deleteItem,
  getItemQuantity,
  increaseItemQuantity,
} from "../cart/cartSlice";
function MenuItem({ pizza }) {
  const { name, unitPrice, ingredients, soldOut, imageUrl } = pizza;

  const itemCartQuantity = useSelector(getItemQuantity(pizza.id));

  const dispatch = useDispatch();

  function handleAddToCart(e) {
    e.preventDefault();

    dispatch(addItem(pizza));
  }

  function handleIncrease(e) {
    e.preventDefault();

    dispatch(increaseItemQuantity(pizza.id));
  }
  function handleDecrease(e) {
    e.preventDefault();
    dispatch(decreaseItemQuantity(pizza.id));
  }

  function handleDelete(e) {
    e.preventDefault();
    dispatch(deleteItem(pizza.id));
  }

  return (
    <li className="flex gap-4 py-2">
      <img
        src={imageUrl}
        alt={name}
        className={`max-h-24 ${soldOut ? "opacity-70 grayscale" : ""}`}
      />
      <div className="flex grow flex-col pt-0.5">
        <p className="font-medium">{name}</p>
        <p className="text-sm capitalize italic text-stone-500">
          {ingredients.join(", ")}
        </p>
        <div className="mt-auto flex items-center justify-between">
          {!soldOut ? (
            <p className="text-sm">{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="text-sm font-medium uppercase text-stone-500">
              Sold out
            </p>
          )}
          {!soldOut && !itemCartQuantity && (
            <Button type="small" onClick={handleAddToCart}>
              Add to cart
            </Button>
          )}

          {itemCartQuantity && (
            <div className="flex items-center gap-2 md:gap-3">
              <Button type="round" onClick={handleDecrease}>
                -
              </Button>
              <p className="text-sm font-medium">{itemCartQuantity}</p>
              <Button type="round" onClick={handleIncrease}>
                +
              </Button>
              <Button type="small" onClick={handleDelete}>
                Delete
              </Button>
            </div>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
