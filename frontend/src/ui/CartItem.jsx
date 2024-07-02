/* eslint-disable react/prop-types */

import { useState } from 'react';
import { BASE_URL } from '../services/APIServices';
import { useDispatch } from 'react-redux';
import { updateCartItem } from '../redux/slice/cart';

function CartItem({ product }) {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(product.quantity);

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
      <img className="h-64" src={BASE_URL + product.product.photo} />
      <div className="grow space-y-4">
        <div className="flex border-b border-zinc-400">
          <h2 className="text-zinc-600 text-lg font-semibold pb-3 grow">
            {product.product.name}
          </h2>
          <span className="font-bold text-xl">
            ₹&nbsp;{product.product.price * quantity}
          </span>
        </div>
        <p className="text-lg text-zinc-600 font-semibold">
          Price:&nbsp; ₹{product.product.price}
        </p>

        <div className="space-x-5 mt-5">
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
          <button
            className="bg-red-600 text-white py-2 px-4 font-bold uppercase"
            onClick={() =>
              dispatch(updateCartItem({ cartId: product._id, quantity }))
            }
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
