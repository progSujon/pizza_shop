import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import CartProvider from './context/CartContext.jsx'
import App from './App.jsx'
import Home from './component/Home.jsx'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Layout from './component/Layout.jsx'
import About from './component/About.jsx'
import PizzaDetails from './component/PizzaDetails.jsx'
import Cart from './component/Cart.jsx'
import Order from './component/Order.jsx'
import Checkout from './component/Checkout.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children: [
  {
    path: "/",
    element: <Home/>,
  },
        {
        path: "pizza/:id",
        element: <PizzaDetails/>,
      },
  {
    path: "cart",
    element: <Cart/>,
  },
  {
    path: "order",
    element: <Order/>,
  },
  {
    path: "checkout",
    element: <Checkout/>,
  },
]
  },
]);

createRoot(document.getElementById('root')).render(
  <CartProvider>
    <RouterProvider router={router}></RouterProvider>
  </CartProvider>,
)
