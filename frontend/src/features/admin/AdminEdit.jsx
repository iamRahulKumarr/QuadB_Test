import { useLoaderData } from 'react-router-dom';
import {
  BASE_URL,
  fetchProductInfo,
  updateProduct,
} from '../../services/APIServices';
import { useState } from 'react';

function AdminEdit() {
  const product = useLoaderData();
  const [formData, setFormData] = useState({
    name: product.name,
    price: product.price,
    description: product.description,
  });
  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  async function handleSubmit(e) {
    e.preventDefault();
    await updateProduct({ id: product._id, ...formData });
    // navigate(-1);
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className="grid xl:grid-cols-2 gap-5 mt-5 px-5">
        <div className="flex justify-center gap-1">
          {product.photo.map((photo) => (
            <img key={photo} className="h-96" src={BASE_URL + photo} />
          ))}
        </div>
        <div>
          <input
            type="text"
            name="name"
            placeholder="Product Title"
            className="w-full border border-zinc-400 p-2 focus:outline-none"
            value={formData.name}
            onChange={handleChange}
          />
          <h3 className="text-zinc-600 text-lg font-semibold mt-8">Price:</h3>
          <input
            type="number"
            name="price"
            min={0}
            className="w-2/4 border border-zinc-400 p-2 focus:outline-none"
            placeholder="In rupees"
            value={formData.price}
          />

          <h3 className="text-zinc-600 text-lg font-semibold mt-8">
            Product Description:
          </h3>

          <textarea
            className="w-full border border-zinc-400 p-2 focus:outline-none"
            rows={7}
            name="description"
            value={formData.description}
          >
            {product.description}
          </textarea>
        </div>
      </div>
      <div className="w-1/5 mx-auto flex gap-5">
        <button
          type="submit"
          className="bg-red-600 text-white py-2 px-4 w-full font-bold uppercase"
        >
          Submit
        </button>
        <button className="bg-red-600 text-white py-2 px-4 w-full font-bold uppercase">
          Delete
        </button>
      </div>
    </form>
  );
}

export async function loader({ params }) {
  const { productId } = params;
  const data = await fetchProductInfo(productId);
  return data;
}
export default AdminEdit;
