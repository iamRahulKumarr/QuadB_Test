import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { getIsLogged } from '../redux/slice/auth';

import Logout from '../features/auth/Logout';
import Button from './Button';

function Navbar() {
  const isUserLogged = useSelector(getIsLogged);

  const { userType } = JSON.parse(localStorage.getItem('user_info')) ?? {
    userType: 'customer',
  };

  return (
    <header className="xl:p-4 flex justify-between items-center border-b-2 border-red-600">
      <Link to="/" className="font-bold uppercase xl:text-3xl text-zinc-700">
        E-TShirts
      </Link>
      {isUserLogged ? (
        <div className="flex items-center gap-10">
          <Button type="link__round" redirect="/cart">
            <ion-icon name="cart-outline"></ion-icon>
          </Button>
          {userType === 'admin' && <Button redirect="/admin">Manage</Button>}

          <Logout />
        </div>
      ) : (
        <Button redirect="/login" type="link">
          Login / Register
        </Button>
      )}
    </header>
  );
}

export default Navbar;
