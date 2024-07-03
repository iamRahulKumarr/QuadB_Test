import { useDispatch } from 'react-redux';

import { logout } from '../../redux/slice/auth';

import Button from '../../ui/Button';
import { clearCart } from '../../redux/slice/cart';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logout());
    dispatch(clearCart());
    return navigate('/login');
  }

  return <Button onClick={handleLogout}>Logout</Button>;
}

export default Logout;
