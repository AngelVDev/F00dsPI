import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import ReactDOM from "react-dom";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./store/index.js";
import Landing from "./components/Landing";
import Home from "./components/Home";
import Creator from "./components/Creator";
import Detail from "./components/Detail";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Home/>} />
          <Route path="/home/:id" element={<Detail />}/>
          <Route path="/create" element={<Creator />} />
        </Routes>
    </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
