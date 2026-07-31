import { useCart } from "../context/CartContext";

const Order = () => {
  const { checkoutData } = useCart();

  if (!checkoutData) {
    return (
      <div className="text-center py-20">
        <h1 className="text-4xl font-bold">
          No Order Found
        </h1>
      </div>
    );
  }

  const { customer, items, orderDate } = checkoutData;

  const total = items.reduce((sum, item) => {
    const addonPrice = item.addons.reduce(
      (a, b) => a + b.price,
      0
    );

    return (
      sum +
      (item.price + addonPrice) * item.quantity
    );
  }, 0);

  return (
    <div className="max-w-7xl mx-auto py-10 px-5 text-black">

      <h1 className="text-5xl font-bold text-green-600">
        Order Confirmed 🎉
      </h1>

      <p className="mt-3 text-white">
        Thank you for your order.
      </p>

      <div className="bg-white shadow-lg rounded-xl p-6 mt-8">

        <h2 className="text-2xl font-bold mb-4">
          Customer Information
        </h2>

        <p><strong>Name:</strong> {customer.name}</p>
        <p><strong>Email:</strong> {customer.email}</p>
        <p><strong>Phone:</strong> {customer.phone}</p>
        <p><strong>Address:</strong> {customer.address}</p>
        <p><strong>Payment:</strong> {customer.payment}</p>
        <p><strong>Date:</strong> {orderDate}</p>

      </div>

      <div className="bg-white shadow-lg rounded-xl p-6 mt-8">

        <h2 className="text-2xl font-bold mb-4">
          Ordered Items
        </h2>

        {items.map((item) => (
          <div
            key={`${item.id}-${item.size.name}`}
            className="border-b py-4"
          >
            <h3 className="font-bold">
              {item.title}
            </h3>

            <p>
              Size: {item.size.name}
            </p>

            <p>
              Quantity: {item.quantity}
            </p>

            <p>
              Addons:
              {" "}
              {item.addons.length
                ? item.addons
                    .map((a) => a.name)
                    .join(", ")
                : "None"}
            </p>
          </div>
        ))}

        <div className="flex justify-between mt-6 text-2xl font-bold">

          <span>Total</span>

          <span>${total.toFixed(2)}</span>

        </div>

      </div>

    </div>
  );
};

export default Order;