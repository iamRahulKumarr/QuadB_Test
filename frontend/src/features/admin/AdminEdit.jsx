import { useState } from 'react';
import { useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';

import {
  BASE_URL,
  fetchProductInfo,
  updateProduct,
} from '../../services/APIServices';

import DeleteProduct from './DeleteProduct';
import Button from '../../ui/Button';
import UploadImage from './UploadImage';

function AdminEdit() {
  const product = useLoaderData();
  const [showMessage, setShowMessage] = useState(false);
  const [formMessage, setFormMessage] = useState('');
  const [image, setImage] = useState(product.photo);
  const [formData, setFormData] = useState({
    name: product.name,
    price: product.price,
    description: product.description,
    gender: product.gender,
  });
  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('price', formData.price);
      data.append('photo', image);
      data.append('description', formData.description);
      data.append('gender', formData.gender);

      const response = await updateProduct(product._id, data);
      setFormData({
        name: response.name,
        price: response.price,
        description: response.description,
        gender: response.gender,
      });
      return setFormMessage('👍 Product Updated Successfully.');
    } catch (err) {
      return setFormMessage('❌ ' + err.response.data.message);
    }
  }
  useEffect(
    function () {
      setShowMessage(true);
      const timer = setTimeout(() => setShowMessage(false), 3000);
      return () => clearInterval(timer);
    },
    [formMessage]
  );
  return (
    <form
      onSubmit={handleSubmit}
      className="py-5"
      encType="multipart/form-data"
    >
      {showMessage && <p className="text-center my-5 ">{formMessage}</p>}
      <div className="grid xl:grid-cols-2 gap-5 mt-5 px-5">
        <div className="flex justify-center gap-1">
          {/* {product.photo.map((photo) => (
            <img key={photo} className="h-96" src={BASE_URL + photo} />
          ))} */}
          <UploadImage currentImage={BASE_URL + image} setImage={setImage} />
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
            onChange={handleChange}
          />
          <h3 className="text-zinc-600 text-lg font-semibold mt-8">Gender:</h3>

          <select
            name="gender"
            className="w-1/4 border border-zinc-400 p-2 focus:outline-none"
            value={formData.gender}
            onChange={handleChange}
          >
            <option value={'male'}>Male</option>
            <option value={'female'}>Female</option>
          </select>

          <h3 className="text-zinc-600 text-lg font-semibold mt-8">
            Product Description:
          </h3>

          <textarea
            className="w-full border border-zinc-400 p-2 focus:outline-none"
            rows={7}
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="flex justify-center gap-5">
        <Button type="submit">Submit</Button>

        <DeleteProduct
          productId={product._id}
          setFormMessage={setFormMessage}
        />
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
