import { useLoaderData } from 'react-router-dom';
import { fetchCart } from '../services/APIServices';
import CartItem from './CartItem';

function Cart() {
  const cart = useLoaderData();
  console.log(cart);
  return (
    <>
      <h1 className="font-bold text-center xl:text-3xl text-zinc-700 pt-5 pb-10">
        My Cart
      </h1>
      <div className="w-3/4 mx-auto space-y-10">
        {cart.map((item) => (
          <CartItem key={item._id} product={item} />
        ))}
      </div>
    </>
  );
}

export async function loader() {
  const data = await fetchCart();
  return data;
}
export default Cart;
