/* eslint-disable react/prop-types */
import { useDispatch } from 'react-redux';

import { useSelector } from 'react-redux';
import { getIsLogged, getUserId } from '../../redux/slice/auth';

import Button from '../../ui/Button';
import { addProduct, addToCart, getCartItem } from '../../redux/slice/cart';
import { useNavigate } from 'react-router-dom';

function AddToCart({ product }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userId = useSelector(getUserId);
  const isUserLogged = useSelector(getIsLogged);
  const isProductInCart = useSelector((state) =>
    getCartItem(state, product._id)
  );

  function handleAddToCart() {
    if (!isUserLogged) {
      return navigate('/login');
    } else {
      dispatch(addProduct(product));
      dispatch(addToCart({ userId, productId: product._id }));
    }
  }

  if (!isProductInCart) {
    return (
      <Button onClick={handleAddToCart}>
        <span>Add to cart</span>
        <ion-icon name="cart-outline"></ion-icon>
      </Button>
    );
  }
  return (
    <Button type="disabled">
      <span>Added to cart</span>
      <ion-icon name="cart-outline"></ion-icon>
    </Button>
  );
}

export default AddToCart;
