import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

import { setUserAuth } from './redux/slice/auth';
import { addToCartWhileLogged } from './redux/slice/cart';

import AppLayout from './ui/AppLayout';
import Home, { loader as homeLoader } from './ui/Home';
import Cart, { loader as cartLoader } from './ui/Cart';
import Register from './ui/Register';
import Login from './ui/Login';
import ProductDetail, { loader as productInfoLoader } from './ui/ProductDetail';
import Products, { loader as productsLoader } from './ui/Products';

function App() {
  const dispatch = useDispatch();

  useEffect(
    function () {
      const userToken = localStorage.getItem('user_token') || null;
      if (userToken) {
        const { username, id, email, userType } = JSON.parse(
          localStorage.getItem('user_info')
        );
        dispatch(
          setUserAuth({ username, id, email, userType, token: userToken })
        );
        dispatch(addToCartWhileLogged());
      }
    },
    [dispatch]
  );
  const router = createBrowserRouter([
    {
      element: <AppLayout />,
      children: [
        {
          path: '/',
          element: <Home />,
          loader: homeLoader,
        },
        {
          path: '/category/:gender',
          element: <Products />,
          loader: productsLoader,
        },
        {
          path: '/category/:gender/:productId',
          element: <ProductDetail />,
          loader: productInfoLoader,
        },
        {
          path: '/cart',
          element: <Cart />,
          loader: cartLoader,
        },
        {
          path: '/login',
          element: <Login />,
        },
        { path: '/register', element: <Register /> },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
