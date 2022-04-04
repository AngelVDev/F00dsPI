import React from "react";
import "./styles/Cards.css";

const Cards = ({image, title, diets, price}) => {
  return (
      <div>
        <img src={image} alt="cardimgerror" />
        <h2>{title}</h2>
        <p>Diet types: {diets} Kgs</p>
        <p>Price: {price}</p>
      </div>
  );
};

export default Cards;
