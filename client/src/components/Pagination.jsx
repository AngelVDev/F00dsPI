import React from "react";
import "./styles/Pagination.css"

export default function Pagination({ renderRecipes, itemsPerPage, pagination }) {
  const pageNum = [];
  for (let i = 1; i <= Math.ceil(renderRecipes / itemsPerPage); i++) {
    pageNum.push(i);
  }
  return (
    <nav id="Pagination">
      <ul>
        {pageNum &&
          pageNum.map((number) => (
            
              <a id="Page" onClick={() => pagination(number)}>{number}</a>
            
          ))}
      </ul>
    </nav>
  );
}