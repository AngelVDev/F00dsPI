import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams} from "react-router-dom"
import { getDetails } from "../store/actions";
import Loader from "./Loader";
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
      <img src={recs.image ? recs.image : "https://i.pinimg.com/564x/00/1e/ed/001eed88d8244f464e8b525fdcd516de.jpg"} alt="comida" />
      <div>
        <p dangerouslySetInnerHTML={{ __html: recs.summary }} />
        <p alt="Steps">Steps: {recs.steps}</p>
        <p alt="Score">Score: {recs.score} </p>
        <p alt="H.Score">Healthiness: {recs.h_score} </p>
        <p className= "priceDiv" alt="Price">Price: ${recs.price} </p>
        <p>Diet types: <span>{!recs.diets ? "Not defined" : recs.diets.map( el =>
        el.length > 1 ? el + ", " : el + ".")}</span></p>
      </div>
      <button><Link to= "/home">Let's go back</Link></button>
    </div>)
    }else{ return(
      <Loader/>

    )
    }
};

export default Detail;
