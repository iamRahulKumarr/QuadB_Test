import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { getIsLogged, logout } from '../redux/slice/auth';
import { useDispatch } from 'react-redux';

function Navbar() {
  const isUserLogged = useSelector(getIsLogged);
  const dispatch = useDispatch();

  return (
    <header className="xl:p-4 flex justify-between items-center border-b-2 border-red-600">
      <Link to="/" className="font-bold uppercase xl:text-3xl text-zinc-700">
        E-TShirts
      </Link>
      {isUserLogged ? (
        <div className="flex items-center gap-10">
          <Link
            to={'/cart'}
            className="flex text-2xl rounded-full p-2 border-2 border-red-600"
          >
            <ion-icon name="cart-outline"></ion-icon>
          </Link>
          <button
            className="bg-red-600 text-white py-2 px-4 font-bold uppercase"
            onClick={() => dispatch(logout())}
          >
            Logout
          </button>
        </div>
      ) : (
        <Link
          to={'/login'}
          className="bg-red-600 text-white py-2 px-4 font-bold uppercase"
        >
          Login / Register
        </Link>
      )}
    </header>
  );
}

export default Navbar;
