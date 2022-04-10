import React from "react";
import { Link } from "react-router-dom";
import "./styles/Landing.css";

const Landing = () => {
  return (
    <div className="JUMBOTRON">
      <h1 className="JUMBOFONT">Today's menu</h1>
      <Link to="/home">
        <button className="JUMBUTTON">¡Let's see them!</button>
      </Link>
    </div>
  );
};

export default Landing;
