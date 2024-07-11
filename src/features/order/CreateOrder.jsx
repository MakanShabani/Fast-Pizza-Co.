/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/no-unescaped-entities */
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import EmptyCart from "../cart/EmptyCart";
import { createOrder } from "../../services/apiRestaurant";
import { formatCurrency, isValidPhone } from "../../utilities/helpers";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart, getTotalOrdersPrice } from "../cart/cartSlice";
import store from "../../store";
import { useEffect, useState } from "react";
import {
  fetchAddress,
  getIsLoadingAddress,
  getUserAddress,
  getUserError,
  getUsername,
  getUserPosition,
} from "../user/userSlice";
import FormError from "../../ui/FormError";
function CreateOrder() {
  const dispatch = useDispatch();

  const [withPriority, setWithPriority] = useState(false);

  const username = useSelector(getUsername);
  const address = useSelector(getUserAddress);
  const errorAddress = useSelector(getUserError);
  const isLoadingAddress = useSelector(getIsLoadingAddress);

  const userPosition = useSelector(getUserPosition);

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const formErrors = useActionData();

  const cart = useSelector(getCart);

  const totalCartPrice = useSelector(getTotalOrdersPrice);

  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;

  const totalPrice = totalCartPrice + priorityPrice;

  if (!cart.length) return <EmptyCart />;

  function handlePosition(e) {
    e.preventDefault();
    dispatch(fetchAddress());
  }

  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>

      {/* <Form method="POST" action="order/new"> */}
      <Form method="POST">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <div className="grow">
            <input
              className="input grow"
              type="text"
              name="customer"
              defaultValue={username}
              required
            />
          </div>
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input className="input" type="tel" name="phone" required />
            {formErrors?.phone && <FormError text={formErrors.phone} />}
          </div>
        </div>

        <div className="relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              className="input"
              type="text"
              name="address"
              defaultValue={address}
              required
            />
            {errorAddress && <FormError text={errorAddress} />}
          </div>
          <span className="absolute right-[3px] top-[3px] z-50 md:right-[5px] md:top-[5x]">
            <Button
              disabled={isLoadingAddress}
              type="small"
              onClick={handlePosition}
            >
              Get position
            </Button>
          </span>
        </div>

        <div className="mb-12 flex items-center gap-5">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
          />
          <label htmlFor="priority" className="font-medium">
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="hidden"
            name="position"
            value={
              userPosition.latitude && userPosition.longitude
                ? `${userPosition.latitude},${userPosition.longitude}`
                : ""
            }
          />
          <Button>
            {isSubmitting
              ? "Placing order..."
              : `Order now for ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true",
  };

  //Validate data
  const errors = {};

  if (!isValidPhone(order.phone))
    errors.phone =
      "Please give us your correct phone number. We might need it to contact you.";

  if (Object.keys(errors).length > 0) return errors;

  //Call API - Everything is ok
  const newOrder = await createOrder(order);

  //Empty cart
  //We can't use dispatch function here
  //So we import store object here, and then, dispatch clearCart action using the store object directly
  //Not performant, we should'nt overuse it

  store.dispatch(clearCart());

  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
