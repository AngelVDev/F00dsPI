import React from "react";
import "./styles/Cards.css";

const Cards = ({image, title, diets, score, price}) => {
  return (
      <div id="container">
        <div id="info">
        <h1>{title}</h1>
        <p>Diet types: {diets}</p>
        <p>Score: {score}</p>
        <p>Price: {price}</p>
        </div>
        <img src={image} alt="cardimgerror" />
      </div>
  );
};

export default Cards;
