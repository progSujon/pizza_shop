import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Cart = () => {
  const { cart, increase, decrease, removeCart } = useCart();

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const tax = cart.length > 0 ? 5 : 0;
  const total = subtotal + tax;

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-5 py-20 text-center">
        <h1 className="text-5xl font-bold">Your Cart is Empty 🛒</h1>

        <p className="text-gray-500 mt-4">
          Add some delicious pizzas to your cart.
        </p>

        <Link to="/">
          <button className="btn bg-orange-500 hover:bg-orange-600 text-white mt-8">
            Continue Shopping
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-5 py-10 text-black">
      <h1 className="text-5xl font-bold mb-10 text-white">Shopping Cart</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}

        <div className="lg:col-span-2 space-y-6">
          {cart.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-lg p-5 flex gap-5"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-40 h-40 object-cover rounded-xl"
              />

              <div className="flex-1">
                <h2 className="text-2xl font-bold">{item.title}</h2>

                <p className="mt-2">
                  Size:
                  <span className="font-semibold ml-2">
                    {item.size.name}
                  </span>
                </p>

                <p className="mt-1">
                  Addons:
                  {" "}
                  {item.addons.length > 0
                    ? item.addons.map((addon) => addon.name).join(", ")
                    : "None"}
                </p>

                <div className="flex items-center gap-3 mt-5">
                  <button
                    onClick={() => decrease(item.id)}
                    className="btn btn-sm"
                  >
                    -
                  </button>

                  <span className="font-bold text-xl">
                    {item.quantity}
                  </span>

                  <button
                    onClick={() => increase(item.id)}
                    className="btn btn-sm"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="text-right flex flex-col justify-between">
                <h3 className="text-3xl font-bold text-orange-500">
                  ${(item.price * item.quantity).toFixed(2)}
                </h3>

                <button
                  onClick={() => removeCart(item.id)}
                  className="btn btn-error text-white"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}

        <div className="bg-white rounded-2xl shadow-lg p-6 h-fit">
          <h2 className="text-3xl font-bold mb-6">
            Order Summary
          </h2>

          <div className="flex justify-between mb-3">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>

          <div className="flex justify-between mb-3">
            <span>Delivery</span>
            <span className="text-green-600">
              Free
            </span>
          </div>

          <div className="flex justify-between mb-5">
            <span>Tax</span>
            <span>${tax.toFixed(2)}</span>
          </div>

          <hr />

          <div className="flex justify-between text-2xl font-bold mt-5">
            <span>Total</span>

            <span className="text-orange-500">
              ${total.toFixed(2)}
            </span>
          </div>

          <Link to="/checkout">
            <button className="btn bg-orange-500 hover:bg-orange-600 text-white w-full mt-8">
              Proceed to Checkout
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;