import React from "react";
import "./styles/Cards.css";

const Cards = (image, title, diets, price) => {
  return (
    <div>
      <div>
        <img src={image} alt="cardimgerror" />
      </div>
      <h2>{title}</h2>
      <div>
        <p>Diet types: {diets} Kgs</p>
        <p>Price: {price}</p>
      </div>
    </div>
  );
};

export default Cards;
