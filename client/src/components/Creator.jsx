import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createRecipe, getDietTypes } from "../store/actions";
import { useDispatch, useSelector } from "react-redux";
import "./styles/Creator.css"
import Home from "./Home";

function validateForm (input){
  let error = {};
  if (!input.title) {
    error.title = "Title required";
  } else if (!input.summary) {
    error.summary = "Sum summary pls";
  } else if (!input.steps) {
    error.steps = "Tell us how";
  } else if (!input.diets) {
    error.steps = "Define a diet type";
  }
  return error;
};
const Creator = () => {
  const history = useNavigate();
  let dispatch = useDispatch();
  const diets = useSelector((state) => state.diets); 
  // const dietsOn = ["LACTO OVO VEGATARIAN", "DAIRY FREE", "GLUTEN FREE", "PRIMAL", "PESCATARIAN", "WHOLE 30", "VEGAN", "PALEOLITHIC", "FODMAP FRIENDLY"];
  let [error, setError] = useState({});
  let [input, setInput] = useState({
    title: "",
    image: "",
    summary: "",
    score: "",
    h_score: "",
    steps: [],
    diets: [],
    price: "",
  });

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setError(
      validateForm({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleDelete(el) {
    setInput({
      ...input,
      diets: input.diets.filter((occ) => occ !== el),
    });
  }

  function handleSelect(e) {
    setInput({
      ...input,
      diets: [...input.diets, e.target.value],
    });
  }

  function handleSubmit(e) {
    e.preventDefault(e);
    dispatch(createRecipe(input));
    alert("¡SUCCESS!");
    setInput({
      title: "",
      summary: "",
      image: "",
      score: "",
      h_score: "",
      steps: [],
      price: "",
      diets: [],
    });
    history.push(<Home></Home>);
  }

  useEffect(() => {
    dispatch(getDietTypes());
  }, [dispatch]);
  //<-HANDLERS->
  if (diets){
  return (
    <div>
      <h1>Tell us about that recipe below:</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label>Title: 
          <input
            type="text"
            value={input.title}
            name="title"
            required="true"
            onChange={(e) => handleChange(e)}
          />
          {error.title && <p>{error.title} </p>}
          </label>
        </div>
        <div>
          <label>Summary: 
          <input
            type="text"
            value={input.summary}
            name="summary"
            required="true"
            onChange={(e) => handleChange(e)}
          />
          {error.summary && <p>{error.summary} </p>}
          </label>
        </div>

        <div>
          <label>Image: 
          <input
            type="file"
            value={input.image}
            name="image"
            onChange={(e) => handleChange(e)}
          />
          </label>
        </div>

        <div>
          <label>Score: 
          <input
            type="number"
            value={input.spoonacularScore}
            name="spoonacularScore"
            onChange={(e) => handleChange(e)}
          />
          </label>
        </div>

        <div>
          <label>Healthiness: 
          <input
            type="number"
            value={input.healthScore}
            name="healthScore"
            onChange={(e) => handleChange(e)}
          />
          </label>
        </div>

        <div>
          <label>Steps: 
          <input
            type="text"
            value={input.steps}
            name="steps"
            onChange={(e) => handleChange(e)}
          />
          </label>
        </div>

        <div>
          <label>Price: 
          <input
            type="number"
            value={input.price}
            name="price"
            onChange={(e) => handleChange(e)}
          />
          </label>
        </div>

        <select onChange={(e) => handleSelect(e)}>
          {diets.map((el) => (
            <option value={el.name}>{el.name.toUpperCase()}</option>
          ))}
        </select>
        <ul>
          <li>{input.diets.map((el) => el.toUpperCase().length >= 1 ? el.toUpperCase() + " ," : ".")}</li>
        </ul>
        <button type="submit">Create Recipe</button>
        <Link to="/home">
          <button>Back</button>
        </Link>
      </form>
      {input.diets.map((el) => (
        <div>
          <p>{el.toUpperCase()}</p>
          <button class="breaker" onClick={() => handleDelete(el)}>x</button>
        </div>
      ))}
    </div>

  );} else {
    return(
    <div class="spinner"></div>
    )
  }
};

export default Creator;
