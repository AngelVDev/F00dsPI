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
// import Pagination from "./Pagination";
import SearchBar from "./SearchBar";
import Creator from "./Creator";
//<--------------------HOME-------------------->
function Home() {
  const allDiets = useSelector((state) => state.diets);
  const dispatch = useDispatch();
  const renderRecipes = useSelector((state) => state.allRecipes);
  const [recipes, setRecipes] = useState();
  //<------------PAGINATION------------------>
  // Página actual, inicializada en 1
  const [currentPage, setCurrentPage] = useState(1);
  // Cards o Items que voy a mostrar por página
  const [itemsPerPage, setItemsPerPage] = useState(9);

  // Número de páginas que quiero mostrar
  const [pageNumberLimit] = useState(5);
  // Máximo de páginas
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
  // Mínimo de páginas
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

  // En cada página voy a insertar las cards
  const pages = [];
  useEffect(() => {
    if (renderRecipes) {
      setRecipes(renderRecipes);
    }
  }, [renderRecipes]);
  useEffect(() => {
    if (recipes) {
      for (
        let i = 1;
        i <= Math.ceil(renderRecipes.length / itemsPerPage);
        i++
      ) {
        pages.push(i);
      }
    }
  }, [recipes]);

  // Información de los items que voy a mostrar en cada página
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = recipes?.slice(indexOfFirstItem, indexOfLastItem);

  const handleClick = (event) => {
    setCurrentPage(Number(event.target.id));
  };
  const handleNextBtn = () => {
    setCurrentPage(currentPage + 1);
    if (currentPage + 1 > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };
  const handlePrevBtn = () => {
    setCurrentPage(currentPage - 1);
    if ((currentPage - 1) % pageNumberLimit === 0) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  const handleMoreBtn = () => {
    setItemsPerPage(itemsPerPage + 8);
  };

  let pageIncrementBtn = null;
  if (pages.length > maxPageNumberLimit) {
    pageIncrementBtn = <button onClick={handleNextBtn}>&hellip;</button>;
  }

  let pageDecrementBtn = null;
  if (minPageNumberLimit >= 1) {
    pageDecrementBtn = <button onClick={handlePrevBtn}>&hellip;</button>;
  }

  // Renderizamos los números de las páginas como (<Li>)
  const renderPageNumbers = pages.map((number) => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
        <div
          className={currentPage === number ? "active" : null}
          key={number}
          id={number}
          onClick={handleClick}
        >
          {number}
        </div>
      );
    } else {
      return null;
    }
  });
  //<------------PAGINATION------------------>
  useEffect(() => {
    dispatch(getRecipes());
    dispatch(getDietTypes());
  }, [dispatch]);
  // useEffect(() => {
  //
  // }, [dispatch]);
  //<--------HANDLERS-------->
  // function handleClick(event) {
  //   event.preventDefault();
  //   dispatch(getRecipes());
  // }
  let handleName = (e) => {
    e.preventDefault();

    dispatch(orderByName(e.target.value));
  };
  let handleScore = (e) => {
    e.preventDefault();

    dispatch(orderByScore(e.target.value));
  };
  let handleDiets = (e) => {
    dispatch(filterByDiet(e.target.value));
  };
  let handleCreations = (e) => {
    dispatch(showCreated(e.target.value));
  };
  //<--------HANDLERS-------->
  console.log(currentItems);
  return (
    <div>
      <nav>
        <button>
          <Link to={<Creator />}>SHARE YOUR RECIPE</Link>
        </button>
        <button onClick={(event) => handleClick(event)}>Clear filters</button>
        <SearchBar />
        <label>
          Sort by name
          <select onChange={(e) => handleName(e)}>
            <option value="ASC">A-Z</option>
            <option value="DES">Z-A</option>
          </select>
        </label>
        <label>
          Sort by score
          <select onChange={(e) => handleScore(e)}>
            <option value="ASC">Lo-to-Hi</option>
            <option value="DES">Hi-to-Lo</option>
          </select>
        </label>
        <label>
          Show by existence
          <select onChange={(e) => handleCreations(e)}>
            <option value="ALL">ALL</option>
            <option value="API">Only API</option>
            <option value="DB">Database</option>
          </select>
        </label>
        <label>
          Show by diet/s
          <select onChange={(e) => handleDiets(e)}>
            <option value="All">All</option>
            {allDiets?.map((el) => {
              return <option value={el.name}> {el.name} </option>;
            })}
          </select>
        </label>
      </nav>
      <div>
        {currentItems &&
          currentItems?.map((recs) => {
            return (
              <Link to={"/home/" + recs.id}>
                <Cards
                  image={recs.image}
                  title={recs.title}
                  types={recs.diets}
                  score={recs.score}
                  key={recs.id}
                />
              </Link>
            );
          })}
        <div>
          <button
            className="btn-pag"
            onClick={handlePrevBtn}
            disabled={currentPage === pages[0] ? true : false}
          >
            Prev
          </button>
          {pageDecrementBtn}
          {renderPageNumbers}
          {pageIncrementBtn}
          <button
            className="btn-pag"
            onClick={handleNextBtn}
            disabled={currentPage === pages[pages.length - 1] ? true : false}
          >
            Next
          </button>
          <button onClick={handleMoreBtn}>Show more recipes</button>
        </div>
      </div>
    </div>
  );
}

export default Home;
