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
      <h2>{recs.title}</h2>
      <img src={recs.image} alt="comida" />
      <div>
        <p dangerouslySetInnerHTML={{ __html: recs.summary }} />
        <p alt="Steps">Steps: {recs.steps}</p>
        <p alt="Score">Score: {recs.score} </p>
        <p alt="H.Score">Healthiness: {recs.h_score} </p>
        <p alt="Price">Price: ${recs.price} </p>
        <p>Diet types: <span>{!recs.createdInDb? recs.diets + " ": recs.diets.map(el=> el.name + " ")}</span></p>
      </div>
      <button><Link to= "/home">Let's go back</Link></button>
    </div>)
    }else{
      return(<div>Loading</div>)
    }
};

export default Detail;
