import { useParams, useNavigate } from "react-router-dom";
import pizzas from "../data/pizzas.json";
import { FaStar, FaClock } from "react-icons/fa";
import { useState } from "react";
import { useCart } from "../context/CartContext";

const PizzaDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const pizza = pizzas.find((item) => item.id === Number(id));

  if (!pizza) {
    return (
      <div className="max-w-7xl mx-auto py-20 text-center">
        <h1 className="text-5xl font-bold text-red-500">
          🍕 Pizza Not Found
        </h1>

        <p className="mt-4 text-gray-500">
          Sorry! This pizza doesn't exist.
        </p>
      </div>
    );
  }

  const [selectedSize, setSelectedSize] = useState(pizza.sizes[0]);
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [showModal, setShowModal] = useState(false);

  const handleAddon = (addon) => {
    const exists = selectedAddons.find(
      (item) => item.name === addon.name
    );

    if (exists) {
      setSelectedAddons(
        selectedAddons.filter(
          (item) => item.name !== addon.name
        )
      );
    } else {
      setSelectedAddons([...selectedAddons, addon]);
    }
  };

  const addonPrice = selectedAddons.reduce(
    (sum, addon) => sum + addon.price,
    0
  );

  const totalPrice =
    (selectedSize.price + addonPrice) * quantity;

const handleAddToCart = () => {
  addToCart({
    id: pizza.id,
    title: pizza.title,
    image: pizza.image,
    size: selectedSize,
    addons: selectedAddons,
    quantity,
    price: selectedSize.price,
  });

  setShowModal(true);
};

  return (
    <div className="max-w-7xl mx-auto px-5 py-10 ">
      <div className="grid lg:grid-cols-2 gap-10">
        {/* Left */}
        <div>
          <img
            src={pizza.image}
            alt={pizza.title}
            className="rounded-3xl shadow-xl w-full"
          />
        </div>

        {/* Right */}
        <div>
          <h1 className="text-5xl font-bold">
            {pizza.title}
          </h1>

          <div className="flex gap-6 mt-4">
            <div className="flex items-center gap-2">
              <FaStar className="text-yellow-500" />
              <span>{pizza.rating}</span>
            </div>

            <div className="flex items-center gap-2">
              <FaClock />
              <span>{pizza.deliveryTime}</span>
            </div>
          </div>

          <p className="mt-5 text-gray-600">
            {pizza.description}
          </p>

          {/* Size */}
          <h2 className="text-2xl font-bold mt-10">
            Choose Size
          </h2>

          <div className="flex gap-4 mt-4 flex-wrap">
            {pizza.sizes.map((size) => (
              <button
                key={size.name}
                onClick={() => setSelectedSize(size)}
                className={`px-6 py-3 rounded-xl border transition ${
                  selectedSize.name === size.name
                    ? "bg-orange-500 text-white border-orange-500"
                    : "hover:border-orange-500"
                }`}
              >
                <p>{size.name}</p>
                <p className="font-bold">${size.price}</p>
              </button>
            ))}
          </div>

          {/* Addons */}
          <h2 className="text-2xl font-bold mt-10">
            Addons
          </h2>

          <div className="mt-4 space-y-3">
            {pizza.addons.map((addon) => (
              <label
                key={addon.name}
                className="flex justify-between items-center border rounded-xl p-4 cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={selectedAddons.some(
                      (item) => item.name === addon.name
                    )}
                    onChange={() => handleAddon(addon)}
                  />

                  <span>{addon.name}</span>
                </div>

                <span className="font-semibold">
                  +${addon.price}
                </span>
              </label>
            ))}
          </div>

          {/* Quantity */}
          <div className="mt-10">
            <h2 className="text-2xl font-bold mb-4">
              Quantity
            </h2>

            <div className="flex items-center gap-4">
              <button
                className="btn"
                onClick={() =>
                  quantity > 1 &&
                  setQuantity(quantity - 1)
                }
              >
                -
              </button>

              <span className="text-2xl font-bold">
                {quantity}
              </span>

              <button
                className="btn"
                onClick={() =>
                  setQuantity(quantity + 1)
                }
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Order Summary */}
      <div className="mt-14 text-black bg-white rounded-3xl shadow-xl p-8">
        <h2 className="text-3xl font-bold mb-6">
          Order Summary
        </h2>

        <div className="flex justify-between">
          <span>Pizza ({selectedSize.name})</span>
          <span>${selectedSize.price}</span>
        </div>

        {selectedAddons.map((addon) => (
          <div
            key={addon.name}
            className="flex justify-between mt-2"
          >
            <span>{addon.name}</span>
            <span>${addon.price}</span>
          </div>
        ))}

        <div className="flex justify-between mt-4">
          <span>Quantity</span>
          <span>{quantity}</span>
        </div>

        <hr className="my-5" />

        <div className="flex justify-between text-3xl font-bold text-orange-500">
          <span>Total</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>

        <button
          onClick={handleAddToCart}
          className="btn bg-orange-500 hover:bg-orange-600 text-white w-full mt-8"
        >
          Add To Cart
        </button>
      </div>
      {/*------------------- modal ------------- */}
      {showModal && (
  <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
    <div className="bg-white rounded-2xl p-8 w-[90%] max-w-md text-center shadow-2xl">

      <div className="text-6xl mb-4">🍕</div>

      <h2 className="text-3xl font-bold text-green-600">
        Added to Cart!
      </h2>

      <p className="text-gray-500 mt-3">
        {pizza.title} has been added successfully.
      </p>

      <div className="flex gap-4 mt-8">

        <button
          onClick={() => setShowModal(false)}
          className="btn flex-1"
        >
          Continue Shopping
        </button>

        <button
          onClick={() => navigate("/cart")}
          className="btn bg-orange-500 hover:bg-orange-600 text-white flex-1"
        >
          View Cart
        </button>

      </div>

    </div>
  </div>
)}
    </div>
    
  );
};

export default PizzaDetails;