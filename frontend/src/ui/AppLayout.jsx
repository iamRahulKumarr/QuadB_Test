import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
// import { useDispatch } from 'react-redux';

// import { addToCartOnLogin } from '../redux/slice/cart';

function AppLayout() {
  // const dispatch = useDispatch();
  // const isUserLogged = localStorage.getItem('isLoggedIn');

  // if (isUserLogged == 'true') {
  //   dispatch(addToCartOnLogin());
  //   localStorage.setItem('isLoggedIn', 'false');
  // }
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default AppLayout;
