import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import { useNavigation } from 'react-router-dom';
// import { useDispatch } from 'react-redux';

// import { addToCartOnLogin } from '../redux/slice/cart';

function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';

  return (
    <>
      {isLoading && (
        <div className="absolute w-full h-full flex justify-center items-center backdrop-blur-sm z-30">
          <div className="loader"></div>
        </div>
      )}
      <Navbar />
      <Outlet />
    </>
  );
}

export default AppLayout;
