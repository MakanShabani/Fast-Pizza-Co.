import { useLoaderData } from "react-router-dom";
import { getMenu } from "../../services/apiRestaurant";
import MenuItem from "./MenuItem";

function Menu() {
  const menus = useLoaderData();
  return (
    <ul className="divide-y divide-stone-200 px-2">
      {menus.map((pizza) => (
        <MenuItem pizza={pizza} key={pizza.id} />
      ))}
    </ul>
  );
}

export async function loader() {
  const menus = await getMenu();
  return menus;
}

export default Menu;
