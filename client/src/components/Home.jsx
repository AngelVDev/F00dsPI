import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  filterByDiet,
  getDietTypes,
  getRecipes,
  orderByName,
  orderByScore,
  showCreated,
} from "../store/actions";
import { Link } from "react-router-dom";
import Cards from "./Cards";
import Pagination from "./Pagination";
import SearchBar from "./SearchBar";

const Home = () => {
  const allDiets = useSelector((state) => state.diets);
  const dispatch = useDispatch();
  const renderRecipes = useSelector((state) => state.allRecipes);
  //<------------PAGINATION------------------>
  const [currentPage, setCurrentPage] = useState(1);
  // eslint-disable-next-line no-unused-vars
  const [recPerPage, _setRecPerPage] = useState(9);
  const indexOfLastRec = currentPage * recPerPage;
  const indexOfFirstRec = indexOfLastRec - recPerPage;
  const currentRecs = renderRecipes.slice(indexOfFirstRec, indexOfLastRec);
  // eslint-disable-next-line no-unused-vars
  const [_order, setOrder] = useState("");

  const PAGINATION = (pageNum) => {
    setCurrentPage(pageNum);
  };
  //<------------PAGINATION------------------>
  useEffect(() => {
    dispatch(getRecipes());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getDietTypes());
  }, [dispatch]);
  //<--------HANDLERS-------->
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
  let handleScore = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    dispatch(orderByScore(e.target.value));
    setOrder(e.target.value);
  };
  let handleDiets = (e) => {
    dispatch(filterByDiet(e.target.value));
  };
  let handleCreations = (e) => {
    dispatch(showCreated(e.target.value));
  };
  //<--------HANDLERS-------->
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
          Sort by name
          <select onChange={(e) => handleName(e)} id="A-Z">
            <option value="ASC">A-Z</option>
            <option value="DES">Z-A</option>
          </select>
        </label>
        <label>
          {" "}
          Sort by score
          <select onChange={(e) => handleScore(e)} id="SCORE">
            <option value="ASC">Lo-to-Hi</option>
            <option value="DES">Hi-to-Lo</option>
          </select>
        </label>
        <label>
          {" "}
          Show by existence
          <select onChange={e => handleCreations(e)} id="CREATED">
            <option value="ALL">ALL</option>
            <option value="API">Only API</option>
            <option value="DB">Database</option>
          </select>
        </label>
        <label>
          {" "}
          Show by diet/s
          <select onChange={e => handleDiets(e)} id="DIETS">
            <option value="All">All</option>
            {allDiets?.map((el) => {
              return <option value={el.name}> {el.name} </option>;
            })}
          </select>
        </label>
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
