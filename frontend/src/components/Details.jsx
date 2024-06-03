import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

const Details = ({ open, setOpen, movieData }) => {
  const [showPlaylistModal, setShowPlaylistModal] = useState(false);
  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [newPlaylistName, setNewPlaylistName] = useState("");
  let userId = localStorage.getItem("userId");

  useEffect(() => {
    if (showPlaylistModal) {
      axios
        .get(`http://localhost:5000/api/playlist/${userId}`)
        .then((response) => {
          setPlaylists(response.data);
        })
        .catch((error) => {
          console.error("There was an error fetching the playlists!", error);
        });
    }
  }, [showPlaylistModal]);

  const handleAddToPlaylist = () => {
    // console.log("Selected Playlist:", selectedPlaylist);
    // console.log(movieData);
    if (selectedPlaylist) {
      axios
        .post(
          `http://localhost:5000/api/playlists/${selectedPlaylist}/${userId}/addMovie`,
          movieData
        )
        .then((response) => {
          // console.log("Movie added to playlist:", response.data);
          setShowPlaylistModal(false);
          setOpen(false);
        })
        .catch((error) => {
          console.error(
            "There was an error adding the movie to the playlist!",
            error
          );
        });
    }
  };

  const handleCreatePlaylist = () => {
    if (newPlaylistName) {
      axios.
      post("http://localhost:5000/api/addPlaylist", {
        playlistName: newPlaylistName,
        owner: userId,
      })
        .then((response) => {
          const newPlaylist = response.data;
          setPlaylists([...playlists, newPlaylist]);
          setSelectedPlaylist(newPlaylist._id);
          setNewPlaylistName(""); // Clear the input field
        })
        .catch((error) => {
          console.error("There was an error creating the playlist!", error);
        });
    }
  };

  return (
    <>
      <Transition show={open}>
        <Dialog className="relative z-10" onClose={() => setOpen(false)}>
          <TransitionChild
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </TransitionChild>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <TransitionChild
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <DialogPanel className="pointer-events-auto relative w-screen max-w-md">
                    <TransitionChild
                      enter="ease-in-out duration-500"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="ease-in-out duration-500"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
                        <button
                          type="button"
                          className="relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                          onClick={() => setOpen(false)}
                        >
                          <span className="absolute -inset-2.5" />
                          <span className="sr-only">Close panel</span>
                          <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </TransitionChild>
                    <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                      <div className="relative flex-1 px-4 sm:px-6">
                        <div className="flex justify-between border-2 rounded-md">
                          <img
                            src={movieData?.Poster}
                            alt="Poster"
                            className="w-50 h-60 object-cover rounded-md"
                          />
                          <div className="block">
                            <p className="text-2xl px-4 font-bold">
                              {movieData?.Title}
                            </p>
                            <p className="px-4 text-cyan-800">
                              {movieData?.Genre}
                            </p>
                            <p className="pt-8 px-4 text-slate-800">
                              <strong className="text-cyan-800">
                                Released
                              </strong>{" "}
                              - {movieData?.Released}
                            </p>
                            <p className="px-4 text-slate-800">
                              <strong className="text-cyan-800">Actors</strong>{" "}
                              - {movieData?.Actors}
                            </p>
                            <p className="px-4 text-slate-800">
                              <strong className="text-cyan-800">
                                Director
                              </strong>{" "}
                              - {movieData?.Director}
                            </p>
                            <p className="px-4 text-slate-800">
                              <strong className="text-cyan-800">
                                IMDB Rating
                              </strong>{" "}
                              - {movieData?.imdbRating}
                            </p>
                          </div>
                        </div>
                        <div>
                          <p className="p-2 mt-10">{movieData?.Plot}</p>
                        </div>

                        <div className="flex justify-center mt-20">
                          <button
                            className="border-solid border-2 border-sky-500 p-4 px-16 rounded-full hover:bg-sky-500 hover:text-white"
                            onClick={() => {
                              setShowPlaylistModal(true);
                              setOpen(false);
                            }}
                          >
                            Add to Playlist
                          </button>
                        </div>
                      </div>
                    </div>
                  </DialogPanel>
                </TransitionChild>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* Playlist Selection Modal */}
      <Transition show={showPlaylistModal} as={React.Fragment}>
        <Dialog
          className="relative z-10"
          onClose={() => setShowPlaylistModal(false)}
        >
          <TransitionChild
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </TransitionChild>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <TransitionChild
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <DialogPanel className="pointer-events-auto relative w-screen max-w-md">
                    <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                      <div className="relative flex-1 px-4 sm:px-6">
                        <div className="flex justify-between items-center">
                          <h2 className="text-2xl font-bold">
                            Select a Playlist
                          </h2>
                          <button
                            type="button"
                            className="relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                            onClick={() => setShowPlaylistModal(false)}
                          >
                            <span className="absolute -inset-2.5" />
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                        <ul className="mt-4">
                          {playlists.map((playlist) => (
                            <li key={playlist._id} className="mb-2">
                              <label className="flex items-center">
                                <input
                                  type="radio"
                                  value={playlist._id}
                                  checked={selectedPlaylist === playlist._id}
                                  onChange={() =>
                                    setSelectedPlaylist(playlist._id)
                                  }
                                  className="mr-2"
                                />
                                {playlist.playlistName}
                              </label>
                            </li>
                          ))}
                        </ul>
                        <div className="mt-4">
                          <h3 className="text-xl font-bold">
                            Create a New Playlist
                          </h3>
                          <input
                            type="text"
                            className="mt-2 p-2 border rounded-md w-full"
                            placeholder="New Playlist Name"
                            value={newPlaylistName}
                            onChange={(e) => setNewPlaylistName(e.target.value)}
                          />
                          <button
                            className="mt-2 border-solid border-2 border-sky-500 p-2 rounded-md hover:bg-sky-500 hover:text-white"
                            onClick={handleCreatePlaylist}
                          >
                            Create Playlist
                          </button>
                        </div>
                        <div className="flex justify-center mt-4">
                          <button
                            className="border-solid border-2 border-sky-500 p-4 px-16 rounded-full hover:bg-sky-500 hover:text-white"
                            onClick={handleAddToPlaylist}
                          >
                            Confirm
                          </button>
                        </div>
                      </div>
                    </div>
                  </DialogPanel>
                </TransitionChild>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Details;
