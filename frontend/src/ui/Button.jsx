/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';

function Button({ type = 'button', redirect, onClick, children }) {
  const base =
    'flex justify-center gap-2 items-center text-white py-2 px-4 font-bold uppercase ';

  const classes = {
    button: base + 'bg-red-600',
    button__full: base + 'w-full bg-red-600',
    link: base + 'bg-red-600',
    link__text: 'text-red-600 font-bold text-sm',
    link__round: 'flex text-2xl rounded-full p-2 border-2 border-red-600',
    disabled: base + 'bg-red-300',
  };

  if (type === 'link' || type === 'link__round' || type === 'link__text') {
    return (
      <Link to={redirect} className={classes[type]}>
        {children}
      </Link>
    );
  }

  if (type === 'disabled') {
    return (
      <button className={classes[type]} disabled={true}>
        {children}
      </button>
    );
  }
  if (type === 'submit') {
    return (
      <button className={classes.button} type="submit" onClick={onClick}>
        {children}
      </button>
    );
  }

  return (
    <button className={classes[type]} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
