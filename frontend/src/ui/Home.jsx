import { useLoaderData } from 'react-router-dom';

import { fetchCatgories, BASE_URL } from '../services/APIServices';
import { Link } from 'react-router-dom';

function Home() {
  const categories = useLoaderData();

  return (
    <>
      <h1 className="xl:text-3xl text-zinc-700 uppercase text-center my-5 font-bold">
        Choose Gender
      </h1>
      <div className="mx-auto w-2/4 grid grid-cols-1 gap-12 xl:grid-cols-2">
        {categories.map((category) => (
          <div className="h-96 w-full relative" key={category._id}>
            <div className="h-full w-full imageHead absolute z-10 bottom-0 redGradient border-t-2 border-white" />
            <Link
              to={`/category/${category.gender}`}
              className="flex right-9 absolute bottom-9 z-20 text-2xl text-white gap-2 items-center p-2"
            >
              <p className="font-bold uppercase">{category.gender}</p>
              <ion-icon name="arrow-forward-circle-outline"></ion-icon>
            </Link>

            <img
              className="object-cover h-full w-full"
              src={BASE_URL + category.photo}
            />
          </div>
        ))}
      </div>
    </>
  );
}

export function loader() {
  const data = fetchCatgories();
  return data;
}

export default Home;
