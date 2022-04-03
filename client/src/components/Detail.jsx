import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDetails } from "../store/actions";

const Detail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    dispatch(getDetails(id));
  }, [dispatch, id]);
  const recipeDetails = useSelector((state) => state.recipeDetail);
  console.log(recipeDetails);
  return (
    <div>
      <h1>Detailed Info</h1>
      <h2>{recipeDetails.title}</h2>
      <img src={recipeDetails.image} alt="comida" />
      <div>
        <p alt="Summ">Summary: {recipeDetails.summary}</p>
        <p alt="Steps">Steps: {recipeDetails.steps}</p>
        <p alt="Score">Score: {recipeDetails.score} </p>
        <p alt="H.Score">Healthiness: {recipeDetails.h_score} </p>
        <p alt="Price">Price: {recipeDetails.price} </p>
        <p>
          Diet types: <span>{recipeDetails.diets}</span>
        </p>
      </div>
    </div>
  );
};

export default Detail;
