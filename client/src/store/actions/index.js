import axios from "axios";

export function getRecipes(){
  return function(dispatch){
           axios.get("http://localhost:3001/recipes")
          .then(response => {
              return dispatch({
                  type: "GET_RECIPES",
                  payload: response.data
              })
  })
}}
// export function getRecipes() {
//   return async function (dispatch) {
//     const response = await axios.get("http://localhost:3001/recipes");
//     let json = response.data;
//     dispatch({ type: "GET_RECIPES", payload: json });
//   };
// }
export function getDietTypes() {
  return async function (dispatch) {
    let json = await axios.get("http://localhost:3001/types", {});
    dispatch({ type: "GET_TYPES", payload: json.data });
  };
}
export function getQRecipes(title) {
  return async function(dispatch){
    try {
        var json = await axios.get(`http://localhost:3001/recipes?title=${title}`)
        return dispatch({
            type: "GET_QUERY",
            payload: json.data
        })  
    } catch (error) {
        console.log(error)
    }}
}
export function getDetails(id) {
  return async function (dispatch) {
    var json = await axios.get("http://localhost:3001/recipes/" + id);
    dispatch({
      type: "GET_DETAIL",
      payload: json.data,
    });
  };
}
export function createRecipe(payload) {
  return async function () {
    const response = await axios.post("http://localhost:3001/recipes", payload);
    return response;
  };
}
export function orderByName(payload) {
  return async (dispatch) => {
      dispatch({
      type: "FILTER_NAME",
      payload,
    });
  };
}
export function showCreated(payload) {
  return (dispatch) => {
    dispatch({
      type: "FILTER_CREATEDS",
      payload,
    });
  };
}
export function filterByDiet(payload) {
  return {
    type: "FILTER_BY_DIET",
    payload,
  };
}
export function orderByScore(payload) {
  return {
    type: "ORDER_BY_SCORE",
    payload,
  };
}
