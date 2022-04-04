import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams} from "react-router-dom"
import { getDetails } from "../store/actions";
import { render } from "react-dom";

const Detail = () => {
  const recs = useSelector((state) => state.recipeDetail);
  console.log(recs)
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect((id) => {
    dispatch(getDetails());
    alert("MARIACHISSSS AIAAIAAAAAAIIII")
  }, [dispatch,id]);
  render (
    <div>
      <h1>Detailed Info</h1>
      <h2>{recs.title}</h2>
      <img src={recs.image} alt="comida" />
      <div>
        <p alt="Summ">Summary: {recs.summary}</p>
        <p alt="Steps">Steps: {recs.steps}</p>
        <p alt="Score">Score: {recs.score} </p>
        <p alt="H.Score">Healthiness: {recs.h_score} </p>
        <p alt="Price">Price: {recs.price} </p>
        <p>
          Diet types: <span>{recs.diets}</span>
        </p>
      </div>
    </div>
  );
};
console.log("Se termina la joditaaaaa")
export default Detail;
