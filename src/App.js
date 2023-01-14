import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Sell from "./components/Sell/Sell";
import Contact from "./components/Contact/Contact";
import About from "./components/About/About";
import Buy from "./components/Buy/Buy";
import Events from "./components/Events/Events";
import Home from './components/Home/Home';
import Details from './components/Details/Details';

function App() {
  return (
    <>
        <div className="bg-slate-900">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path={"/"} element={<Home/>}></Route>
          <Route path={"/:slug"} element={<Details/>}></Route>
          <Route path="/sell" element={<Sell />}></Route>
          <Route path="/buy" element={<Buy/>}></Route>
          <Route path="/contact" element={<Contact />}></Route>
          <Route path="/events" element={<Events/>}></Route>
          <Route path="/about" element={<About />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
      </div>
    </>
  );
}

export default App;
