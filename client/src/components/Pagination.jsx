import React from "react";

export default function Pagination  ({recPerPage, renderRecipes, pagination}) {
  const pageNum = [];
  for (let i = 1; i <= Math.ceil(renderRecipes / recPerPage); i++) {
    pageNum.push(i);
  }
  return (
    <nav>
      <ul>
        {pageNum &&
          pageNum.map((number) => (
            <li>
              <a href="Pene" onClick={() => pagination(number)}>
                {number}
              </a>
            </li>
          ))}
      </ul>
    </nav>
  );
};


