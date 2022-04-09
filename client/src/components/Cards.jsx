import React from "react";
import "./styles/Cards.css";

const Cards = ({image, title, diets}) => {
  return (
      <div id="container">
        <div id="info">
        <h1>{title}</h1>
        <p>Diets: {diets.map((el)=> 
        el.length ?
          el.charAt(0).toUpperCase() + el.slice(1) + ", " 
        : el.charAt(0).toUpperCase() + el.slice(1)
        )}</p>
        </div>
        <img src={image} alt="cardimgerror" />
      </div>
  );
};

export default Cards;
