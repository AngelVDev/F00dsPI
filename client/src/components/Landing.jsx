import React from "react";
import { Link } from "react-router-dom";
import "./styles/Landing.css";

const Landing = () => {
  return (
    <div class="JUMBOTRON">
      <h1 class="JUMBOFONT">Today's menu</h1>
      <Link to="/home">
        <button class="JUMBUTTON">¡Let's see them!</button>
      </Link>
    </div>
  );
};

export default Landing;
