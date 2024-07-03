import { useLoaderData } from 'react-router-dom';
import { BASE_URL, fetchProducts } from '../../services/APIServices';
import { Link } from 'react-router-dom';

function AdminMenu() {
  const products = useLoaderData();

  return (
    <div className="flex justify-center items-center h-[80dvh] overflow-auto">
      <div className="mx-auto w-4/5 grid gap-3 grid-cols-1 md:grid-cols-2 xl:grid-cols-4 mt-5">
        {products.map((product) => (
          <div key={product._id} className="flex justify-center flex-col gap-2">
            <img className="h-80" src={BASE_URL + product.photo[0]} />
            <p className="text-zinc-600 text-sm font-semibold border-b border-zinc-400">
              {product.name}
            </p>
            <p className="text-zinc-600 text-xs">Oversized T-Shirt</p>
            <span className="text-xs font-bold">₹&nbsp;{product.price}</span>
            <div className="flex justify-evenly mt-2">
              <Link
                className="bg-red-600 text-white py-2 px-4 font-bold uppercase"
                to={`edit/${product._id}`}
              >
                <ion-icon name="color-wand-outline"></ion-icon>&nbsp; Edit
              </Link>
              <Link className="bg-red-600 text-white py-2 px-4 font-bold uppercase">
                <ion-icon name="eye-outline"></ion-icon>&nbsp; View
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export async function loader() {
  const data = await fetchProducts();
  return data;
}

export default AdminMenu;
