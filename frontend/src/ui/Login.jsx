import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getIsLogged, login } from '../redux/slice/auth';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function Login() {
  const isUserLogged = useSelector(getIsLogged);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleLogin(e) {
    e.preventDefault();
    if (formData.email && formData.password) {
      dispatch(login(formData));
    }
    setFormData({ email: '', password: '' });
  }

  if (isUserLogged) {
    return <Navigate to="/" />;
  }

  return (
    <div className="w-4/5 mx-auto mt-16">
      <h1 className="font-bold text-center xl:text-3xl text-zinc-700">
        Welcome &nbsp; :)
      </h1>
      <form
        className="flex flex-col items-center gap-5 mt-8 w-2/6 mx-auto"
        onSubmit={handleLogin}
      >
        <input
          className="border border-zinc-400 py-2 px-4 w-full focus:outline-none"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
        />
        <input
          className="border border-zinc-400 py-2 px-4 w-full focus:outline-none"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
        />

        <button
          className="bg-red-600 text-white py-2 px-4 w-full font-bold uppercase"
          onClick={() => {}}
        >
          Login
        </button>
        <p>
          Not Registered?{' '}
          <Link to={'/register'} className="text-red-600 font-bold text-sm">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
