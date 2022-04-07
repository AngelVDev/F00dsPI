import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { createRecipe, getDietTypes } from "../store/actions";

const Creator = () => {
  const diets= useSelector((state)=> state.diets)
  let dispatch = useDispatch();
  const history = useNavigate();
  let [error, setError] = useState({});
  let [input, setInput] = useState({
    id: "",
    image: "",
    title: "",
    summary: "",
    score: "",
    h_score: "",
    steps: "",
    diets: "",
    price: "",
  });
  let validate = () => {
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

  function handleChange(e){
    setInput({
        ...input,
        [e.target.name]: e.target.value
    })
setError(validate({
    ...input,
    [e.target.name]: e.target.value
}));
}

function handleDelete(el){
    setInput({
        ...input,
        diets: input.diets.filter(occ=> occ !== el)
    })
}

function handleSelect(e){
    setInput({
        ...input,
        diets: [...input.diets, e.target.value]
    })
}

function handleSubmit(e){
    e.preventDefault(e);
    dispatch(createRecipe(input))
    alert("¡SUCCESS!")
    setInput({
        title:"",
        summary:"",
        image:"",
        spoonacularScore:"",
        healthScore:"",
        steps:[],
        price:"",
        diets:[]
    })
    history.push("/home")
}

useEffect(()=> {
dispatch(getDietTypes());
}, []);
  //<-HANDLERS->
  return (
    <div>
      <h1>Create Your Custom Recipe</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
        <label>Title: </label>
                    <input
                    type="text"
                    value= {input.title}
                    name= "title"
                    required= "true"
                    onChange= {(e)=> handleChange(e)}
                    />
                    {error.title && (
                        <p>{error.title} </p>
                    )}</div><div>
        <label>Summary: </label>
        <input
          type="text"
          value={input.summary}
          name="summary"
          required="true"
          onChange={(e) => handleChange(e)} />
        {error.summary && (
          <p>{error.summary} </p>
                )}
            </div>

            <div>
                <label>Image: </label>
                <input
                type="text"
                value= {input.image}
                name= "image"
                onChange= {(e)=> handleChange(e)}
                />
            </div>

            <div>
                <label>Spoonacular Score: </label>
                <input
                type="number"
                value= {input.spoonacularScore}
                name= "spoonacularScore"
                onChange= {(e)=> handleChange(e)}
                />
            </div>

            <div>
                <label>Health Score: </label>
                <input
                type="number"
                value= {input.healthScore}
                name= "healthScore"
                onChange= {(e)=> handleChange(e)}
                />
            </div>

            {/* <div>
                <label>Steps: </label>
                <input
                {input}
                type="text"
                value= {input.steps}
                name= "steps"
                onChange= {(e)=> handleChange(e)}
                />
            </div> */}

            {/* <div>
                <label>Price: </label>
                <input
                {input}
                type="number"
                value= {input.price}
                name= "price"
                onChange= {(e)=> handleChange(e)}
                />
            </div> */}

            <select onChange={(e)=> handleSelect(e)}>
                {diets.map((el)=> (
                    <option value= {el.name}>{el.name}</option>
                ))}
            </select>
            <ul><li>{input.diets.map(el=> el + " ,")}</li></ul>
            <button  type= "submit">Create Recipe</button>
            <Link to= "/home"><button>Back</button></Link>
        </form>

        {input.diets.map(el=> 
            <div>
                <p>{el}</p>
                <button  onClick= {()=> handleDelete(el)}>x</button>
            </div>)}
    </div>
);
};

export default Creator;
