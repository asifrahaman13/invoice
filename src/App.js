import logo from "./logo.svg";
import React, { Component }  from 'react';
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Contact from "./components/Contact/Contact";
import About from "./components/About/About";
import Buy from "./components/Buy/Buy";
import Events from "./components/Events/Events";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/buy" element={<Buy/>}></Route>
          <Route path="/contact" element={<Contact />}></Route>
          <Route path="/events" element={<Events/>}></Route>
          <Route path="/about" element={<About />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
