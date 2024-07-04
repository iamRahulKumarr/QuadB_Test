import axios from 'axios';

export const BASE_URL = 'http://localhost:8000/';

const userToken = localStorage.getItem('user_token') || null;

export async function fetchCatgories() {
  try {
    const response = await axios.get(BASE_URL + 'api/category');
    return response.data.data;
  } catch (err) {
    console.log(err);
  }
}

export async function createProduct(data) {
  const response = await axios.post(BASE_URL + 'api/product', data, {
    headers: { Authorization: userToken },
  });
  return response;
}

export async function fetchProducts(gender = '') {
  try {
    let api;
    if (!gender) {
      api = axios.get(BASE_URL + 'api/product');
    } else {
      api = axios.get(BASE_URL + 'api/product', {
        params: { gender },
      });
    }
    const response = await api;
    return response.data.data;
  } catch (err) {
    console.log(err);
  }
}

export async function fetchProductInfo(productId) {
  try {
    const response = await axios.get(BASE_URL + `api/product/${productId}`);
    return response.data.data;
  } catch (err) {
    console.log(err);
  }
}

export async function deleteProduct(productId) {
  const response = await axios.delete(BASE_URL + `api/product/${productId}`, {
    headers: { Authorization: userToken },
  });
  return response;
}

export async function userLogin(email, password) {
  const response = await axios.post(BASE_URL + 'api/user/login', {
    email,
    password,
  });
  return response.data.data;
}

export async function userRegister(email, password, confirmPassword, username) {
  const response = await axios.post(BASE_URL + 'api/user/register', {
    email,
    password,
    confirmPassword,
    username,
  });
  return response.data.data;
}

export async function addToCart(userId, productId, quantity = 1) {
  const response = await axios.post(
    BASE_URL + 'api/cart',
    {
      user: userId,
      quantity,
      product: productId,
    },
    { headers: { Authorization: userToken } }
  );
  return response.data.data;
}

export async function updateProduct(productId, data) {
  const response = await axios.put(
    BASE_URL + `api/product/${productId}`,
    data,
    {
      headers: {
        Authorization: userToken,
      },
    }
  );

  return response.data.data;
}

export async function fetchCart() {
  const response = await axios.get(BASE_URL + 'api/cart', {
    params: {
      user: JSON.parse(localStorage.getItem('user_info')).id,
    },
    headers: {
      Authorization: userToken,
    },
  });

  return response.data.data;
}

export async function updateCart(cartId, quantity) {
  const response = await axios.put(
    BASE_URL + `api/cart/${cartId}`,
    { quantity },
    {
      headers: {
        Authorization: userToken,
      },
    }
  );

  return response.data.data;
}

export async function removeItemFromCart(cartId) {
  const response = await axios.delete(BASE_URL + `api/cart/${cartId}`, {
    headers: {
      Authorization: userToken,
    },
  });
  return response;
}
