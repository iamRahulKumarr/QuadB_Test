import { Link } from 'react-router-dom';

function Register() {
  return (
    <div className="w-4/5 mx-auto mt-16">
      <h1 className="font-bold text-center xl:text-3xl text-zinc-700 ">
        Let&apos;s Register
      </h1>
      <form className="flex flex-col items-center gap-5 my-8 w-2/6 mx-auto">
        <input
          className="border border-zinc-400 py-2 px-4 w-full focus:outline-none"
          name="name"
          type="text"
          placeholder="Enter your name"
        />
        <input
          className="border border-zinc-400 py-2 px-4 w-full focus:outline-none"
          name="email"
          type="email"
          placeholder="Enter your email"
        />
        <input
          className="border border-zinc-400 py-2 px-4 w-full focus:outline-none"
          name="password"
          type="password"
          placeholder="Enter your password"
        />
        <input
          className="border border-zinc-400 py-2 px-4 w-full focus:outline-none"
          name="password"
          type="password"
          placeholder="Re-Enter your password"
        />

        <button className="bg-red-600 text-white py-2 px-4 w-full">
          Register
        </button>
        <p>
          Already a user?{' '}
          <Link to={'/login'} className="text-red-600 font-bold text-sm">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
