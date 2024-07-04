import { useState } from 'react';
import { useEffect } from 'react';

import Button from '../../ui/Button';
import UploadImage from './UploadImage';
import { useNavigate } from 'react-router-dom';
import { createProduct } from '../../services/APIServices';

import defaultImg from '../../assets/default_img.jpg';

function AdminProductAdd() {
  const navigate = useNavigate();
  const [showMessage, setShowMessage] = useState(false);
  const [formMessage, setFormMessage] = useState('');
  const [image, setImage] = useState(defaultImg);

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    gender: 'male',
  });

  console.log(formData);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  const handleImageChange = (file) => {
    setImage(file);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('price', formData.price);
      data.append('photo', image);
      data.append('description', formData.description);
      data.append('gender', formData.gender);

      await createProduct(data);
      navigate(-1);
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
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      {showMessage && <p className="text-center my-5 ">{formMessage}</p>}
      <div className="grid xl:grid-cols-2 gap-5 mt-5 px-5">
        <div className="mx-auto">
          <UploadImage currentImage={image} setImage={handleImageChange} />
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
      </div>
    </form>
  );
}

export default AdminProductAdd;
