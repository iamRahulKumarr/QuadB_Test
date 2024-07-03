/* eslint-disable react/prop-types */

import { useState } from 'react';
import { useSelector } from 'react-redux';

import { BASE_URL } from '../../services/APIServices';
import {
  getCartItemQuantity,
  // getCartStats,
} from '../../redux/slice/cart';

import UpdateCartQuantity from './UpdateCartQuantity';
import RemoveFromCart from './RemoveFromCart';

function CartItem({ product }) {
  // const { status: cartStatus } = useSelector(getCartStats);
  const { quantity: cartItemQuantity } = useSelector((state) =>
    getCartItemQuantity(state, product._id)
  );
  console.log(product);
  const [quantity, setQuantity] = useState(cartItemQuantity);

  function handleIncrement() {
    setQuantity((quantity) => (quantity += 1));
  }
  function handleDecrement() {
    if (quantity > 0) {
      setQuantity((quantity) => (quantity -= 1));
    }
  }

  return (
    <div className="flex gap-5">
      <img className="h-64" src={BASE_URL + product.product.photo[0]} />
      <div className="grow space-y-4">
        <div className="flex border-b border-zinc-400">
          <h2 className="text-zinc-600 text-lg font-semibold pb-3 grow">
            {product.product.name}
          </h2>
          <span className="font-bold text-xl">
            ₹&nbsp;{product.product.price * cartItemQuantity}
          </span>
        </div>
        <p className="text-lg text-zinc-600 font-semibold">
          Price:&nbsp; ₹{product.product.price}
        </p>

        <div className="flex gap-5 items-center mt-5">
          <button
            className="rounded-full border-4 border-red-500 py-2 px-3"
            onClick={handleDecrement}
          >
            -
          </button>
          <p className="inline-block">{quantity}</p>
          <button
            className="rounded-full border-4 border-red-500 py-2 px-3"
            onClick={handleIncrement}
          >
            +
          </button>
          {quantity !== cartItemQuantity && (
            <UpdateCartQuantity productId={product._id} quantity={quantity} />
          )}
        </div>
        <RemoveFromCart productId={product._id} />
      </div>
    </div>
  );
}

export default CartItem;
