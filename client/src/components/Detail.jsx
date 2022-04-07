import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams} from "react-router-dom"
import { getDetails } from "../store/actions";
import "./styles/Detail.css"
// import { render } from "react-dom";

const Detail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const recs = useSelector((state) => state.recipeDetail);
  useEffect(() => {
    dispatch(getDetails(id));
  }, [dispatch,id]);
  if(recs){
      return (
    <div id="MASTERCARD">
      <h1>Detailed Info</h1>
      <h2>{recs[0].title}</h2>
      <img src={recs[0].image} alt="comida" />
      <div>
        <p alt="Summ">Summary: {recs[0].summary}</p>
        <p alt="Steps">Steps: {recs[0].steps}</p>
        <p alt="Score">Score: {recs[0].score} </p>
        <p alt="H.Score">Healthiness: {recs[0].h_score} </p>
        <p alt="Price">Price: {recs[0].price} </p>
        <p>Diet types: <span>{!recs[0].createdInDb? recs[0].diets + " ": recs[0].diets.map(el=> el.name + " ")}</span></p>
      </div>
      <button><Link to= "/home">Let's go back</Link></button>
    </div>)
    }else{
      return(<div>Loading</div>)
    }
};

export default Detail;
