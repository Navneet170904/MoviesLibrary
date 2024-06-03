import React, {useState} from "react";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import Movies from "../components/Movies";
import Details from "../components/Details";
import { v4 as uuidv4 } from 'uuid';


const Home = () => {
  const [open, setOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState();

  const handleSetSelectedMovie = (movie) => {
    if (movie) {
    
      const moviesWithId = {
        ...movie,
        movieId: movie.movieId || uuidv4()
      };
      setSelectedMovie(moviesWithId);
    } else {
      console.error('Invalid movie object:', movie);
    }
  };



  return (
    <div className="flex">
      <Navbar />

      <div className="block w-full h-screen justify-center">
        <SearchBar />

        <div className="home bg-red">
          <Movies setOpen={setOpen} setSelectedMovie={handleSetSelectedMovie} />
          <Details open={open} setOpen={setOpen} movieData={selectedMovie} />
        </div>
      </div>
    </div>
  );
};

export default Home;
