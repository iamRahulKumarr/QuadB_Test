import { useLoaderData } from 'react-router-dom';
import { BASE_URL, fetchProducts } from '../services/APIServices';
import { Link } from 'react-router-dom';

function Products() {
  const products = useLoaderData();

  return (
    <div className="mx-auto w-4/5 grid xl:grid-cols-4 mt-5">
      {products.map((product) => (
        <Link
          to={product._id}
          key={product._id}
          className="flex justify-center flex-col gap-2"
        >
          <img className="h-80" src={BASE_URL + product.photo} />
          <p className="text-zinc-600 text-sm font-semibold border-b border-zinc-400">
            {product.name}
          </p>
          <p className="text-zinc-600 text-xs">Oversized T-Shirt</p>
          <span className="text-xs font-bold">₹&nbsp;{product.price}</span>
        </Link>
      ))}
    </div>
  );
}

export async function loader({ params }) {
  const { gender } = params;
  const data = await fetchProducts(gender);
  return data;
}

export default Products;
