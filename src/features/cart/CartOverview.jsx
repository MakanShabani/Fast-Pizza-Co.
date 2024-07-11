import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTotalOrdersCount, getTotalOrdersPrice } from "./cartSlice";
import { formatCurrency } from "../../utilities/helpers";

function CartOverview() {
  const totalOrdersCount = useSelector(getTotalOrdersCount);
  const totalOrdersPrice = useSelector(getTotalOrdersPrice);

  if (totalOrdersCount <= 0) return null;

  return (
    <div className="flex items-center justify-between bg-stone-800 px-4 py-4 uppercase text-stone-200 sm:px-6">
      <p className="space-x-4 text-sm font-semibold text-stone-300 sm:space-x-6 md:text-base">
        <span>{totalOrdersCount} pizzas</span>
        <span>{formatCurrency(totalOrdersPrice)}</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
