/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom';

import { deleteProduct } from '../../services/APIServices';

import Button from '../../ui/Button';

function DeleteProduct({ productId, setFormMessage }) {
  const navigate = useNavigate();

  async function handleProductDelete() {
    try {
      await deleteProduct(productId);
      return navigate(-1);
    } catch (err) {
      return setFormMessage(err.response.data.message);
    }
  }
  return <Button onClick={handleProductDelete}>Delete</Button>;
}

export default DeleteProduct;
