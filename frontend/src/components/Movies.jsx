import React, { useContext } from "react";
import MoveisContext from "../context/MoviesContext";

const Movies = ({ setOpen, setSelectedMovie }) => {

  const handleCardClick = (movie) => {
    setSelectedMovie(movie);
    // console.log(movie);
    setOpen(true);
  };

  const { movies, error } = useContext(MoveisContext);

  return (
    <div>
        <div className="bg-white">
          <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-8 lg:max-w-full lg:px-8">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              Movies List
            </h2>
          {error===""?<div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-5 xl:gap-x-8 hover:cursor-pointer">
              {movies.map((movie) => (
                <div
                  key={movie.id}
                  className="card group relative"
                  onClick={() => handleCardClick(movie)}
                >
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                    <img
                      src={movie.Poster}
                      alt=""
                      className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                    />
                  </div>
                  <div className="mt-4 flex justify-between">
                    <div>
                      <h3 className="text-sm text-gray-700">
                        <span aria-hidden="true" className="absolute inset-0" />
                        {movie.Title}
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">{movie.Genre}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>:<div>{error}</div>}
          </div>
        </div>
    </div>
  );
};

export default Movies;
