import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getAuthError, getIsLogged, login } from '../../redux/slice/auth';

import Button from '../../ui/Button';
import Input from '../../ui/Input';
import ErrorMessage from '../../ui/ErrorMessage';
import { useEffect } from 'react';

function Login() {
  const dispatch = useDispatch();
  const loginError = useSelector(getAuthError);
  const isUserLogged = useSelector(getIsLogged);
  const [showError, setShowError] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  useEffect(
    function () {
      if (loginError) {
        setShowError(true);
        const timer = setTimeout(() => setShowError(false), 3000);
        return () => clearTimeout(timer);
      }
    },
    [loginError]
  );

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleLogin(e) {
    e.preventDefault();
    if (formData.email !== '' && formData.password !== '') {
      dispatch(login(formData));
    }
    setFormData({ email: '', password: '' });
  }

  if (isUserLogged) {
    return <Navigate to="/" />;
  }

  return (
    <div className="w-4/5 mx-auto mt-16">
      {showError && <ErrorMessage message={loginError} />}
      <h1 className="font-bold text-center xl:text-3xl text-zinc-700">
        Welcome &nbsp; :)
      </h1>
      <form
        className="flex flex-col items-center gap-5 mt-8 w-2/6 mx-auto"
        onSubmit={handleLogin}
      >
        <Input name="email" value={formData.email} onChange={handleChange} />

        <Input
          name="password"
          value={formData.password}
          onChange={handleChange}
        />

        <Button type="button__full">Login</Button>
        <div>
          <p className="inline-block">Not Registered?&nbsp;</p>
          <Button type="link__text" redirect="/register">
            Register
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Login;
