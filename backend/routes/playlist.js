const express = require("express");
const router = express.Router();
const Playlist = require("../models/Playlist.model");

router.get("/api/playlist/:owner", async (req, res) => {
  try {
    const playlists = await Playlist.find({ owner: req.params.owner });
    res.json(playlists);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/api/addPlaylist", async (req, res) => {
  // console.log(req.body)
  try {
    const { playlistName, public } = req.body;
    // console.log(req.body.owner)
    const newPlaylist = new Playlist({ playlistName, public, owner: req.body.owner });
    // console.log(newPlaylist)
    await newPlaylist.save();
    // console.log("Playlist data saved");
    res.status(201).json(newPlaylist);
  } catch (err) {
    res.status(400).json({ error: 'Error adding playlist', details: err });
  }
});

router.delete("/api/deletePlaylist/:id/:owner", async (req, res) => {
  try {
    const playlist = await Playlist.findById(req.params.id);
    if (!playlist) {
      return res.status(404).json({ message: "Playlist not found" });
    }

    if (playlist.owner.toString() !== req.params.owner.toString()) {
      return res.status(403).json({ message: "You are not authorized to delete this playlist" });
    }

    await playlist.deleteOne();
    // console.log("Playlist deleted");
    res.json({ message: "Playlist deleted" });
  } catch (err) {
    res.status(400).json({ error: 'Error deleting playlist', details: err });
  }
});

module.exports = router;
