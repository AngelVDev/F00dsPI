import React from "react";
import "./styles/Cards.css";

const Cards = ({image, title, diets}) => {
  return (
      <div id="container">
        <div id="info">
        <h1>{title}</h1>
        <p>Diet types: {diets}</p>
        </div>
        <img src={image} alt="cardimgerror" />
      </div>
  );
};

export default Cards;
