import { useLoaderData } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { BASE_URL, fetchProductInfo } from '../services/APIServices';
import { getIsLogged, getUserId } from '../redux/slice/auth';
import {
  addToCart,
  clearCartError,
  getCartItem,
  getCartStats,
} from '../redux/slice/cart';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function ProductDetail() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showButton, setShowButton] = useState(true);
  const userId = useSelector(getUserId);
  const product = useLoaderData();
  const isUserLogged = useSelector(getIsLogged);

  const isProductInCart =
    useSelector((state) => getCartItem(state, product._id)) || null;

  const { error: cartError } = useSelector(getCartStats);

  useEffect(() => {
    if (isProductInCart) {
      setShowButton(false);
    }
  }, [isProductInCart]);

  function handleAddToCart() {
    if (!isUserLogged) {
      return navigate('/login');
    } else if (cartError) {
      dispatch(clearCartError());
    } else {
      dispatch(addToCart({ userId, productId: product._id }))
        .unwrap()
        .then(() => {
          setShowButton(false);
        })
        .catch((error) => {
          console.error('Failed to add product to cart:', error);
        });
    }
  }

  return (
    <div className="grid xl:grid-cols-2 gap-5 mt-5 px-5">
      <div className="flex justify-center gap-1">
        {product.photo.map((photo) => (
          <img key={photo} className="h-96" src={BASE_URL + photo} />
        ))}
      </div>
      <div>
        <h2 className="text-zinc-600 text-2xl font-semibold border-b border-zinc-400 pb-5">
          {product.name}{' '}
          <span className="block text-zinc-400 text-sm font-normal capitalize">
            {product.categoryId.name}
          </span>
        </h2>
        <p className="font-bold text-lg my-5">₹&nbsp;{product.price}</p>
        {!showButton ? (
          <button
            className="bg-red-300 text-white py-2 px-4 align-middle flex items-center gap-2  justify-center font-bold uppercase"
            disabled={true}
          >
            <span>Added to cart</span>
            <ion-icon name="cart-outline"></ion-icon>
          </button>
        ) : (
          <button
            className="bg-red-600 text-white py-2 px-4 align-middle flex items-center gap-2  justify-center font-bold uppercase"
            onClick={handleAddToCart}
          >
            <span>Add to cart</span>
            <ion-icon name="cart-outline"></ion-icon>
          </button>
        )}

        <h3 className="text-zinc-600 text-lg font-semibold mt-8">
          Product Description:
        </h3>
        <div className="space-y-5">
          {product.description.split('\n\n').map((element, index) => (
            <p key={index} className="font-light text-sm">
              {element}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

export async function loader({ params }) {
  const { productId } = params;
  const data = await fetchProductInfo(productId);
  return data;
}

export default ProductDetail;
