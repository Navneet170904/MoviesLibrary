import { useState, useContext } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import MoviesContext from "../context/MoviesContext";
import axios from "axios";

export default function Example({ addPlaylist, userId }) {
  const { open, setOpen } = useContext(MoviesContext);
  const [formData, setFormData] = useState({
    playlistName: "",
    public: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData({
        ...formData,
        [name]: checked,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // console.log(formData);
    // console.log(userId)

    try {
      const response = await axios.post(
        "http://localhost:5000/api/addPlaylist",
        { ...formData, owner: userId } 
      );
      console.log("Form data successfully sent to the backend!", response.data);
      addPlaylist(response.data);
    } catch (error) {
      console.error("Error sending form data to the backend:", error.message);
    }
  };

  return (
    <>
      <Transition show={open}>
        <Dialog className="relative z-10" onClose={setOpen}>
          <TransitionChild
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </TransitionChild>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <TransitionChild
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <DialogTitle
                          as="h3"
                          className="text-base font-semibold leading-6 text-gray-900"
                        >
                          Create Playlist
                        </DialogTitle>
                        <div className="mt-2">
                          <form className="grid" onSubmit={handleSubmit}>
                            <div className="grid justify-between">
                              <div>
                                <input
                                  type="text"
                                  name="playlistName"
                                  placeholder="Playlist Name"
                                  className="p-2 m-4 border-2"
                                  onChange={handleChange}
                                />
                                <input
                                  type="checkbox"
                                  name="public"
                                  checked={formData.public}
                                  className="p-2 m-4 border-2"
                                  onChange={handleChange}
                                />
                                <label for="public" className="py-2 my-4">Public</label>
                              </div>
                              {/* Remove the owner input field */}
                            </div>

                            <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                              <button
                                type="submit"
                                onClick={() => setOpen(false)}
                                className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                              >
                                Create
                              </button>
                              <button
                                type="button"
                                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                onClick={() => setOpen(false)}
                                data-autofocus
                              >
                                Cancel
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
