import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Playlists from "./pages/Playlists";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Details from "./components/Details";
import MoviesContextProvider from "./context/MoviesContextProvider";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./PrivateRoute";
import Example from "./components/Example";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <MoviesContextProvider>
          <Routes>
            <Route exact path="/" element={<PrivateRoute element={Home} />} />
            <Route exact path="/playlists" element={<PrivateRoute element={Playlists} />} />
            <Route exact path="/details" element={<PrivateRoute element={Details} />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="/example" element={<Example />} />
          </Routes>
        </MoviesContextProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
