/* eslint-disable react/prop-types */
import { useState } from 'react';

function UploadImage({ currentImage, setImage }) {
  const [imagePreview, setImagePreview] = useState(currentImage);

  function handleChange(e) {
    const file = e.target.files[0];
    if (file) {
      const newImageURL = URL.createObjectURL(file);
      setImagePreview(newImageURL);
      setImage(file);
    }
  }

  return (
    <div className="relative w-auto h-96">
      {imagePreview && <img className="h-96" src={imagePreview} />}
      <div className="absolute h-full w-full top-0 flex justify-center items-center">
        <label
          htmlFor="file"
          className="font-bold text-3xl py-3 px-5 rounded-full bg-zinc-200 cursor-pointer"
        >
          +
        </label>
        <input
          className="hidden"
          id="file"
          name="file"
          type="file"
          onChange={handleChange}
        />
      </div>
    </div>
  );
}

export default UploadImage;
