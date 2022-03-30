import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getRecipes, orderByName } from "../store/actions";
import { Link } from "react-router-dom";
import Cards from "./Cards";
import Pagination from "./Pagination";
import SearchBar from "./SearchBar";

const Home = () => {
  // const allDiets = useSelector((state) => state.diets);
  const dispatch = useDispatch();
  const renderRecipes = useSelector((state) => state.allRecipes);
  //<------------PAGINATION------------------>
  const [currentPage, setCurrentPage] = useState(1);
  const [recPerPage, _setRecPerPage] = useState(9);
  const indexOfLastRec = currentPage * recPerPage;
  const indexOfFirstRec = indexOfLastRec - recPerPage;
  const currentRecs = renderRecipes.slice(indexOfFirstRec, indexOfLastRec);
  const [_order, setOrder] = useState("");

  const PAGINATION = (pageNum) => {
    setCurrentPage(pageNum);
  };
  //<------------PAGINATION------------------>
  useEffect(() => {
    dispatch(getRecipes());
  }, [dispatch]);

  function handleClick(event) {
    event.preventDefault();
    dispatch(getRecipes());
  }
  let handleName = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    dispatch(orderByName(e.target.value));
    setOrder(e.target.value);
  };
  // let handleScore = (e) => {
  //   e.preventDefault();
  //   setCurrentPage(1);
  //   dispatch(orderByScore(e.target.value));
  //   setOrder(e.target.value);
  // };
  return (
    <div>
      <nav>
        <button>
          <Link>SHARE YOUR RECIPE</Link>
        </button>
        <button onClick={(event) => handleClick(event)}>Clear filters</button>
        <SearchBar />
        <Pagination
          recPerPage={recPerPage}
          renderRecipes={renderRecipes.length}
          pagination={PAGINATION}
        />
        <label>
          {" "}
          Sorty by name
          <select onChange={(e) => handleName(e)} id="A-Z">
            <option value="ASC">A-Z</option>
            <option value="DES">Z-A</option>
          </select>
        </label>
        {/* <label> Sort by score
          <select onChange={(e) => handleScore(e)} id="SCORE">
          <option value="ASC">Lo-to-Hi</option>
            <option value="DES">Hi-to-Lo</option>
          </select>
        </label> */}
      </nav>
      <div>
        {currentRecs?.map((recs) => {
          return (
            <Link to={"/recipes/" + recs.id}>
              <Cards
                image={recs.image}
                name={recs.name}
                types={recs.diets}
                score={recs.score}
                key={recs.id}
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
