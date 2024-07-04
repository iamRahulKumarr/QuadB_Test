import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

import { getIsLogged, setUserAuth } from './redux/slice/auth';
import { addToCartWhileLogged } from './redux/slice/cart';

import AppLayout from './ui/AppLayout';
import Home, { loader as homeLoader } from './ui/Home';
import Cart from './features/cart/Cart';
import Register from './features/auth/Register';
import Login from './features/auth/Login';
import ProductDetail, {
  loader as productInfoLoader,
} from './features/product/ProductDetail';
import Products, {
  loader as productsLoader,
} from './features/product/Products';
import AdminMenu, {
  loader as adminMenuLoader,
} from './features/admin/AdminMenu';
import AdminEdit, {
  loader as adminProductLoaderForEdit,
} from './features/admin/AdminEdit';
import { useSelector } from 'react-redux';
import AdminProductAdd from './features/admin/AdminProductAdd';

function App() {
  const dispatch = useDispatch();
  const isUserLogged = useSelector(getIsLogged);
  if (isUserLogged) {
    dispatch(addToCartWhileLogged());
  }

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
          path: '/admin',
          element: <AdminMenu />,
          loader: adminMenuLoader,
        },
        {
          path: '/admin/product/new',
          element: <AdminProductAdd />,
        },
        {
          path: '/admin/edit/:productId',
          element: <AdminEdit />,
          loader: adminProductLoaderForEdit,
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
          // loader: cartLoader,
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
