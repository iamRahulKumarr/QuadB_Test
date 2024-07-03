import { useLoaderData } from 'react-router-dom';

import { BASE_URL, fetchProductInfo } from '../../services/APIServices';

import AddToCart from '../cart/AddToCart';

function ProductDetail() {
  const product = useLoaderData();

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

        <AddToCart product={product} />

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
