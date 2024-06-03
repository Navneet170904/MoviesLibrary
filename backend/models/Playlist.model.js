const mongoose = require('mongoose')

const playlistSchema = new mongoose.Schema(
    {
        playlistName: { 
            type: String, 
            required: true,
            unique: true,
        },
        public: {
            type: Boolean,
            default: false
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        movieList: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: 'Movie',
        }
    }
)

const Playlist = mongoose.model("Playlist", playlistSchema)

module.exports = Playlist