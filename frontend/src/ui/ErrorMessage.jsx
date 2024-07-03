/* eslint-disable react/prop-types */
function ErrorMessage({ message }) {
  return (
    <p className="text-center font-bold text-sm mb-5">❌&nbsp;{message}</p>
  );
}

export default ErrorMessage;
