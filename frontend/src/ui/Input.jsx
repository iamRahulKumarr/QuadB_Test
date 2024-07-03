/* eslint-disable react/prop-types */
function Input({ name, value, onChange }) {
  return (
    <input
      className="border border-zinc-400 py-2 px-4 w-full focus:outline-none"
      name={name}
      type={name}
      value={value}
      onChange={onChange}
      placeholder={'Enter your ' + name}
    />
  );
}

export default Input;
