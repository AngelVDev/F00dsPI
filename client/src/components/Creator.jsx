import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createRecipe, deleteById, getDietTypes } from "../store/actions";
import { useDispatch, useSelector } from "react-redux";
import "./styles/Creator.css"
// import Loader from "./Loader";

function validateForm (input){
  let error = {};
  if (input.title === null) {error.title = "Title required";} 
  if (input.summary === null) { error.summary = "Sum summary pls";}
  if (input.image === null || input.image.includes(!"https//")) { error.image = "Please put a valid URL";}
  if (input.score <0 && input.score > 100) {error.score = "The value must be a number between 0 and 100"}
  if (input.hScore <0 && input.hScore > 100) {error.hScore = "The value must be a number between 0 and 100"}
  if (input.price <0 && input.price !== Number) {error.hScore = "The value must be a number between 0 and 100"}
  if (!input.steps) {error.steps = "Tell us how";}
  if (!input.diets) {error.diets = "Define a diet type";}
  return error;
};

const Creator = () => {
  let dispatch = useDispatch();
  // const recs = useSelector((state)=>state.recipes)
  // console.log(recs)
  const diets = useSelector((state) => state.diets); 
  const navigate = useNavigate()
  let [error, setError] = useState({});
  let [input, setInput] = useState({
    title: "",
    image: "",
    summary: "",
    score: 0,
    hScore: 0,
    steps: [],
    diets: [],
    price: 0,
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

  function handleDeleteRec(e){
      dispatch(deleteById(input))
      alert("You deleted a recipe")
      navigate("/home")
      // alert("Sabandija")
  }

  function handleDelete(el) {
    setInput({
      ...input,
      diets: input.diets.filter(type => type !== el),
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
    if(Object.values(error).length){alert("Fill all the fields correctly, please")}
     else if(      
    input.title === "" &&
    input.summary === "" &&
    input.score === "" &&
    input.hScore === "" &&
    input.steps === "" &&
    !input.diets.length){alert("Complete the form, please")
  }else{
      dispatch(createRecipe(input));
      alert("Thanks for sharing your secrets");
      setInput({
          title: "",
          summary: "",
          image: "",
          score: "",
          hScore: "",
          steps: [],
          price: "",
          diets: [],
        });
    }
      navigate("/home");
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
      <label>
            Title:
      <input
      type="text"
      value={input.title}
      name="title"
      required
      onChange={(e) => handleChange(e)}
      />
      {error.title && <p>{error.title} </p>}
      </label>
    </div>
    <div>
    <label>
            Summary:
      <input
      type="text"
      value={input.summary}
      name="summary"
      required
      onChange={(e) => handleChange(e)}
    />
    {error.summary && <p>{error.summary} </p>}
    </label>
    </div>
    <div>
      <label>
            Image:
        <input
          type="text"
          value={input.image}
          name="image"
          onChange={(e) => handleChange(e)}
        />
      </label>
    </div>
    <div>
      <label>
            Score:
        <input
          type="number"
          min="1"
          max="100"
          value={input.score}          
          name="score"
          required
          onChange={(e) => handleChange(e)}
        />
        {error.score && <p>{error.score} </p>}
      </label>
    </div>
    <div>
      <label>
            Healthiness:
        <input
          type="number"
          min="1"
          required
          max="100"
          value={input.hScore}
          name="hScore"
          onChange={(e) => handleChange(e)}
        />
        {error.hScore && <p>{error.hScore} </p>}
      </label>
    </div>
    <div>
      <label>
            Steps:
        <input
          type="text"
          value={input.steps}
          name="steps"
          required
          onChange={(e) => handleChange(e)}
        />
        {error.steps && <p>{error.steps} </p>}
      </label>
    </div>
    <div>
      <label>
            Price:
        <input
          type="text"
          required
          value={input.price}
          name="price"
          onChange={(e) => handleChange(e)}
        />
        {error.price && <p>{error.price} </p>}
      </label>
    </div> 
            Pick diets:
        <select onChange={(e) => handleSelect(e)}>
          {diets.map((el) => (
            <option value={el.name}>
              {el.name.charAt(0).toUpperCase().concat(el.name.slice(1))}
            </option>
          ))}
        </select>
        {error.diets && <p>{error.diets} </p>}
        <ul>
        {input.diets.map((el) => (
          <div className="NiGHTS">
            <button className="breaker" onClick={() => handleDelete(el)}>x</button>
            <p>{el.toUpperCase()}</p>
          </div>
        ))}
        </ul>
        
  <button className="butt" type="submit">
    Create Recipe
  </button>
  <Link to="/home">
    <button className="butt">Back</button>
  </Link>
  <input type="text" placeholder="Paste the ID of a recipe" onChange={(e) => handleChange(e)}
  />
    <button className="butt" type="submit" onClick={(e) => handleDeleteRec(e)}>Delete</button>
      </form>
  </div>
  );} else {
    <div>PINGAAA</div>
  }
};

export default Creator;
