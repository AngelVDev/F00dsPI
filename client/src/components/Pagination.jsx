import React from "react";

const Pagination = (recPerPage, fetchAllRecipes, pagination) => {
  const pageNum = [];
  for (let i = 1; i <= Math.ceil(fetchAllRecipes / recPerPage); i++) {
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

export default Pagination;
