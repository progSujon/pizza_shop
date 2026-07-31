import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [checkoutData, setCheckoutData] = useState(null);

  // Add To Cart
  const addToCart = (pizza) => {
    const exist = cart.find((item) => item.id === pizza.id);

    if (exist) {
      setCart(
        cart.map((item) =>
          item.id === pizza.id
            ? { ...item, quantity: item.quantity + pizza.quantity }
            : item
        )
      );
    } else {
      setCart([...cart, pizza]);
    }
  };

  // Remove
  const removeCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  // Increase
  const increase = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // Decrease
  const decrease = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const clearCart = () => {
  setCart([]);
};

  return (
<CartContext.Provider
  value={{
    cart,
    addToCart,
    removeCart,
    increase,
    decrease,
    clearCart,
    checkoutData,
    setCheckoutData,
  }}
>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;