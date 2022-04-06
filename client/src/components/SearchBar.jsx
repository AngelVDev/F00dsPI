import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getQRecipes } from "../store/actions";

const SearchBar = () => {
  let dispatch = useDispatch();
  let [title, setTitle] = useState("");
  let handleInputChange = (e) => {
    e.preventDefault();
    setTitle(e.target.value);
  };
  let handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getQRecipes(title));
  };
  return (
    <div>
      <input
        type="text"
        placeholder="Search your next meal here"
        onChange={(e) => handleInputChange(e)}
      />
      <button type="submit" onClick={(e) => handleSubmit(e)}>
        Tasty
      </button>
    </div>
  );
};

export default SearchBar;
