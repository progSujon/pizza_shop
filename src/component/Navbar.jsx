import { FaShoppingCart, FaPizzaSlice } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const { cart } = useCart();

  // Total Quantity
  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <nav className="text-black bg-white shadow-md sticky top-0 z-50">
      <div className="navbar max-w-7xl mx-auto px-5">

        {/* Left */}
        <div className="navbar-start">
          <Link
            to="/"
            className="flex items-center gap-2 text-3xl font-bold text-orange-500"
          >
            <FaPizzaSlice />
            PizzaHub
          </Link>
        </div>

        {/* Middle */}
        <div className="navbar-center">
          <ul className="flex gap-8 font-semibold">

            <li>
              <NavLink
                to="/home"
                className={({ isActive }) =>
                  isActive
                    ? "text-orange-500"
                    : "hover:text-orange-500"
                }
              >
                Home
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/order"
                className={({ isActive }) =>
                  isActive
                    ? "text-orange-500"
                    : "hover:text-orange-500"
                }
              >
                Order
              </NavLink>
            </li>

          </ul>
        </div>

        {/* Right */}
        <div className="navbar-end">

          <Link
            to="/cart"
            className="relative"
          >
            <button className="btn btn-outline btn-warning gap-2">
              <FaShoppingCart size={18} />
              Cart
            </button>

            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">
                {cartCount}
              </span>
            )}

          </Link>

        </div>

      </div>
    </nav>
  );
};

export default Navbar;