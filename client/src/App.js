import React from "react";
import Landing from "./components/Landing";
import Home from "./components/Home";
import Creator from "./components/Creator";
import Detail from "./components/Detail";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Home />} />
          <Route path="/create" element={<Creator />} />
          <Route path="/home/:id" element={<Detail />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
