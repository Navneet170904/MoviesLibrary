const express = require("express");
const Playlist = require("../models/Playlist.model");
const Movie = require("../models/Movie.model");
const router = express.Router();

router.get("/api/movie/:id", async (req, res) => {
  // console.log(req.params)
  try {
    const movie = await Movie.findOne({_id: req.params.id});
    res.json(movie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



router.post("/api/playlists/:playlistId/:owner/addMovie", async (req, res) => {
  // console.log(req.params)
  // console.log(req.body)
  try {
      const {
    Title,
    Rated,
    Released,
    Runtime,
    Genre,
    Director,
    Actors,
    Plot,
    Language,
    Country,
    Poster,
    imdbRating,
    imdbVotes,
    movieId,
  } = req.body;

  const newMovie = new Movie({
    Title,
    Rated,
    Released,
    Runtime,
    Genre,
    Director,
    Actors,
    Plot,
    Language,
    Country,
    Poster,
    imdbRating,
    imdbVotes,
    movieId,
  });

    const movie = await newMovie.save();
    // console.log("Movie save successfully", movie);

    const playlist = await Playlist.findOne({ _id: req.params.playlistId, owner: req.params.owner }); // Check if the playlist exists and belongs to the logged-in user
    if (!playlist) {
      return res.status(404).json({ message: "Playlist not found or does not belong to the user" });
    }
    // Add the movie to the playlist
    playlist.movieList.push(movie._id);
    // console.log("movie saved to playlist")
    await playlist.save();
    // console.log("Movie added to playlist");
    res.json(playlist);
  } catch (err) {
    res.status(400).json({ error: 'Error adding movie to playlist', details: err });
  }
});

module.exports = router;
