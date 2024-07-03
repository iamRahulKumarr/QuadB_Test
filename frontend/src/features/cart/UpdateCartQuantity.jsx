/* eslint-disable react/prop-types */
import { useDispatch } from 'react-redux';

import { updateCartItem } from '../../redux/slice/cart';

import Button from '../../ui/Button';

function UpdateCartQuantity({ productId, quantity }) {
  const dispatch = useDispatch();
  return (
    <Button
      onClick={() => dispatch(updateCartItem({ cartId: productId, quantity }))}
    >
      Apply
    </Button>
  );
}

export default UpdateCartQuantity;
