import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Checkout = () => {
  const { cart, setCheckoutData, clearCart } = useCart();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const navigate = useNavigate();

  const subtotal = cart.reduce(
  (sum, item) => sum + item.price * item.quantity,
  0
);

const deliveryFee = cart.length ? 3 : 0;

const total = subtotal + deliveryFee;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    payment: "Cash on Delivery",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

const handleOrder = (e) => {
  e.preventDefault();

  setCheckoutData({
    customer: formData,
    items: cart,
    // orderDate: new Date().toLocaleString(),
  });

setCheckoutData({
  customer: formData,
  items: cart,
});

setShowSuccessModal(true);

setTimeout(() => {
  clearCart();
  navigate("/order");
}, 2000);
};

return (
  <div className="max-w-7xl mx-auto px-5 py-10">

    <h1 className="text-4xl font-bold mb-8">
      Checkout
    </h1>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

      {/* Left Side */}

      <div className="lg:col-span-2">

        <div className="bg-base-100 rounded-2xl shadow-xl p-8">

          <h2 className="text-2xl font-bold mb-6">
            Delivery Information
          </h2>

          <form
            onSubmit={handleOrder}
            className="space-y-5"
          >

            <input
              className="input input-bordered w-full"
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
              required
            />

            <input
              className="input input-bordered w-full"
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              required
            />

            <input
              className="input input-bordered w-full"
              name="phone"
              placeholder="Phone Number"
              onChange={handleChange}
              required
            />

            <textarea
              className="textarea textarea-bordered w-full"
              rows="4"
              name="address"
              placeholder="Delivery Address"
              onChange={handleChange}
              required
            />

            <select
              className="select select-bordered w-full"
              name="payment"
              onChange={handleChange}
            >
              <option>Cash on Delivery</option>
              <option>bKash</option>
              <option>Nagad</option>
              <option>Card</option>
            </select>

            <button
              className="btn btn-warning text-white w-full h-14 text-lg"
            >
              Place Order
            </button>

          </form>

        </div>

      </div>

      {/* Right Side */}

      <div>

        <div className="bg-base-100 rounded-2xl shadow-xl p-6 sticky top-24">

          <h2 className="text-2xl font-bold mb-6">
            Order Summary
          </h2>

          <div className="space-y-5">

            {cart.map((item) => (

              <div
                key={item.id}
                className="flex gap-4 border-b pb-4"
              >

                <img
                  src={item.image}
                  className="w-20 h-20 rounded-lg object-cover"
                />

                <div className="flex-1">

                  <h3 className="font-semibold">
                    {item.title}
                  </h3>

                  <p className="text-sm opacity-70">
                    Size : {item.size.name}
                  </p>

                  <p className="text-sm opacity-70">
                    Qty : {item.quantity}
                  </p>

                  <p className="text-sm opacity-70">
                    Add-ons :
                    {
                      item.addons.length
                        ? item.addons.map(a => a.name).join(", ")
                        : " None"
                    }
                  </p>

                </div>

                <div className="font-bold">

                  $
                  {(item.price * item.quantity).toFixed(2)}

                </div>

              </div>

            ))}

          </div>

          <div className="divider"></div>

          <div className="space-y-3">

            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between">
              <span>Delivery Fee</span>
              <span>${deliveryFee.toFixed(2)}</span>
            </div>

            <div className="flex justify-between text-xl font-bold">

              <span>Total</span>

              <span className="text-warning">
                ${total.toFixed(2)}
              </span>

            </div>

          </div>

          <div className="divider"></div>

          <div className="space-y-2 text-sm">

            <p>🚚 Estimated Delivery : 30-40 Minutes</p>

            <p>🔒 Secure Checkout</p>

            <p>💵 Cash / Card / bKash / Nagad</p>

          </div>

        </div>

      </div>

    </div>

    {/* Success Modal */}

    {showSuccessModal && (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

        <div className="bg-white rounded-3xl p-10 text-center w-[90%] max-w-md">

          <div className="text-7xl mb-4">
            ✅
          </div>

          <h2 className="text-3xl font-bold text-green-600">

            Checkout Successful

          </h2>

          <p className="mt-4 text-gray-500">

            Thank you! Your order has been placed successfully.

          </p>

          <div className="loading loading-spinner loading-lg text-warning mt-6"></div>

          <p className="mt-4 text-sm text-gray-400">

            Redirecting to Order Page...

          </p>

        </div>

      </div>
    )}

  </div>
);
};

export default Checkout;