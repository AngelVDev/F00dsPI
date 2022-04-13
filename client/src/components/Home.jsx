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
import "./styles/Home.css"
//<--------------------HOME-------------------->
function Home() {
  const renderRecipes = useSelector((state) => state.allRecipes);
  const allDiets = useSelector((state) => state.diets);
  const dispatch = useDispatch();
  // const [diets, setDiets] = useState('')
  const [order, setOrder] = useState("");
  const [recipes, setRecipes] = useState();
  //<------------PAGINATION------------------>
  // Página actual, inicializada en 1
  const [currentPage, setCurrentPage] = useState(1);
  // Cards o Items que voy a mostrar por página
  const [itemsPerPage, setItemsPerPage] = useState(9);

  // // Número de páginas que quiero mostrar
  // const [pageNumberLimit] = useState(6);
  // // Máximo de páginas
  // const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(10);
  // // Mínimo de páginas
  // const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

  // En cada página voy a insertar las cards

  useEffect(() => {
    if (renderRecipes) {
      setRecipes(renderRecipes);
    }
  }, [renderRecipes]);

  // Información de los items que voy a mostrar en cada página
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = recipes?.slice(indexOfFirstItem, indexOfLastItem);
  const PAGINATION = (pageNum) => {
    setCurrentPage(pageNum);
  }
//<-----P.HANDLERS----->
  // const handleClick = (event) => {
  //   setCurrentPage(Number(event.target.id));
  // };
  // const handleNextBtn = () => {
  //   setCurrentPage(currentPage + 1);
  //   if (currentPage + 1 > maxPageNumberLimit) {
  //     setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
  //     setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
  //   }
  // };
  // const handlePrevBtn = () => {
  //   setCurrentPage(currentPage - 1);
  //   if ((currentPage - 1) % pageNumberLimit === 0) {
  //     setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
  //     setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
  //   }
  // };
  // const handleMoreBtn = () => {
  //   setItemsPerPage(itemsPerPage + 9);
  // };
  // //<-----P.HANDLERS----->

  // let pageIncrementBtn = null;
  // if (pages.length > maxPageNumberLimit) {
  //   pageIncrementBtn = <button className="butt" onClick={handleNextBtn}>&hellip;</button>;
  // }

  // let pageDecrementBtn = null;
  // if (minPageNumberLimit >= 1) {
  //   pageDecrementBtn = <button className="butt" onClick={handlePrevBtn}>&hellip;</button>;
  // }

  // // Renderizamos los números de las páginas
  // const renderPageNumbers = pages.map((number) => {
  //   if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
  //     return (
  //       <div
  //         key={number}
  //         id={number}
  //         onClick={handleClick}
  //       >
  //         {number}
  //       </div>
  //     );
  //   } else {
  //     return null;
  //   }
  // });
  //<------------PAGINATION------------------>
  useEffect(() => {
    dispatch(getRecipes());
    dispatch(getDietTypes());
  }, [dispatch]);
  //<--------F-HANDLERS-------->
  let handleClear = (e) => {
    e.preventDefault();
    dispatch(getRecipes())
};

  let handleName = (e) => {
    e.preventDefault();
      setCurrentPage(1)
    dispatch(orderByName(e.target.value))
    setOrder(e.target.value);
  };

  let handleScore = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    dispatch(orderByScore(e.target.value));
    setOrder(e.target.value);
  };
  let handleDiets = (e) => {
    e.preventDefault();
    setCurrentPage(1)
    dispatch(filterByDiet(e.target.value))
  };
  // if (diets) {
  //  var sortDiets = recipes.filter(rec=>(rec.diets?.includes(diets) || rec.diets?.includes(diets)))
  // }
  // if (diets === 'ALL') {
  //   sortDiets = recipes
  // }

  let handleCreations = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    dispatch(showCreated(e.target.value));
  };
  //<--------F-HANDLERS-------->
  return (
    <div>
      <nav>
        <button className="butt" onClick={(event) => handleClear(event)}>Clear filters</button>
        <button className="butt" ><Link to="/create">SHARE YOUR RECIPE</Link></button>
        <SearchBar />
        <label className="Mabel">
          Sort by name
          <select onChange={(e) => handleName(e)}>
            <option value="ASC">A-Z</option>
            <option value="DES">Z-A</option>
          </select>
        </label>
        <label className="Mabel">
          Sort by score
          <select onChange={(e) => handleScore(e)}>
            <option value="ASC">Lo-to-Hi</option>
            <option value="DES">Hi-to-Lo</option>
          </select>
        </label>
        <label className="Mabel">
          Show by existence
          <select onChange={(e) => handleCreations(e)}>
            <option value="ALL">ALL</option>
            <option value="API">Only API</option>
            <option value="DB">Database</option>
          </select>
        </label>
        <label className="Mabel">
          Show by diet/s
          <select onChange={(e) => handleDiets(e)}>
            <option value="ALL">All</option>
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
                  diets={recs.diets}
                  key={recs.id}
                />
              </Link>
            );
          })}
        {/* <div className="Paloma">
          <button className="butt" onClick={handlePrevBtn} disabled={currentPage === pages[0] ? true : false}>Prev</button>
          {pageDecrementBtn}
          {renderPageNumbers}
          {pageIncrementBtn}
          <button className="butt" onClick={handleMoreBtn}>Show more recipes</button>
          <button className="butt" onClick={handleNextBtn} disabled={currentPage === pages[pages.length - 1] ? true : false}>Next</button>
        </div> */}
<Pagination
  itemsPerPage={itemsPerPage}
  renderRecipes={renderRecipes.length}
  pagination={PAGINATION}
/>
      </div>
    </div>
  );
}

export default Home
