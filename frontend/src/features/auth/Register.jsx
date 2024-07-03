import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAuthError, getIsLogged, register } from '../../redux/slice/auth';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function Register() {
  const loginError = useSelector(getAuthError);
  const isUserLogged = useSelector(getIsLogged);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    username: '',
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleRegister(e) {
    e.preventDefault();
    if (
      formData.email !== '' &&
      formData.password !== '' &&
      formData.username !== '' &&
      formData.confirmPassword !== ''
    ) {
      dispatch(register(formData));
    }
    setFormData({ email: '', password: '', confirmPassword: '', username: '' });
  }

  if (isUserLogged) {
    return <Navigate to="/" />;
  }

  return (
    <div className="w-4/5 mx-auto mt-16">
      {loginError && (
        <p className="text-center font-bold text-sm mb-5">
          ❌&nbsp;{loginError}
        </p>
      )}
      <h1 className="font-bold text-center xl:text-3xl text-zinc-700">
        Let&apos;s Register
      </h1>
      <form
        className="flex flex-col items-center gap-5 mt-8 w-2/6 mx-auto"
        onSubmit={handleRegister}
      >
        <input
          className="border border-zinc-400 py-2 px-4 w-full focus:outline-none"
          name="username"
          type="text"
          value={formData.username}
          onChange={handleChange}
          placeholder="Enter your name"
        />
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
        <input
          className="border border-zinc-400 py-2 px-4 w-full focus:outline-none"
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Re-Enter your password"
        />

        <button className="bg-red-600 text-white py-2 px-4 w-full font-bold uppercase">
          Register
        </button>
        <p>
          Already have an acount?&nbsp;
          <Link to={'/login'} className="text-red-600 font-bold text-sm">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
