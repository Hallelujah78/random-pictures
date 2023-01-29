import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Navbar from "./components/Navbar.js";
import Footer from "./components/Footer";
import { Favourites } from "./pages/Favourites";
import SinglePicture from "./pages/SinglePicture";
import Error from "./pages/Error";
import { PictureProvider } from "./PictureContext";

export const App = () => {
  return (
    <PictureProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route path="/favourites" element={<Favourites />}></Route>
          <Route path="/picture/:id" element={<SinglePicture />}></Route>
          <Route path="*" element={<Error />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </PictureProvider>
  );
};

// photos from - https://picsum.photos/
