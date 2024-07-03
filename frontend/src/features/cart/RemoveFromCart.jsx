/* eslint-disable react/prop-types */

import { useDispatch } from 'react-redux';

import Button from '../../ui/Button';
import { removeCartItem, removeProduct } from '../../redux/slice/cart';

function RemoveFromCart({ productId }) {
  const dispatch = useDispatch();

  function handleRemove() {
    dispatch(removeProduct(productId));
    dispatch(removeCartItem({ cartId: productId }));
  }
  return (
    <div className="mt-3">
      <Button onClick={handleRemove}>Remove Item</Button>;
    </div>
  );
}

export default RemoveFromCart;
