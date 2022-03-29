import React from "react";
import { Link } from "react-router-dom";
import "./styles/Landing.css";

const Landing = () => {
  return (
    <div>
      <h1>Today's menu</h1>
      <Link to="/home">
        <button>¡Let's see them!</button>
      </Link>
    </div>
  );
};

export default Landing;
