import axios from "axios";
/*
axios.get('http://localhost:3001/recipes',{});
axios.get("http://localhost:3001/types",{});
axios.get("http://localhost:3001/recipes?title=" + title);
axios.get("http://localhost:3001/recipes/" + id);
axios.post("http://localhost:3001/recipes", payload);
*/

export function getRecipes() {
  return async function (dispatch) {
    let json = await axios.get("http://localhost:3001/recipes", {});
    return dispatch({ type: "GET_RECIPES", payload: json.data });
  };
}
export function getDietTypes() {
  return async function (dispatch) {
    let json = await axios.get("http://localhost:3001/types", {});
    return dispatch({ type: "GET_TYPES", payload: json.data });
  };
}
export function getQRecipes(title) {
  return async function (dispatch) {
    let json = await axios.get("http://localhost:3001/recipes?title=" + title);
    return dispatch({ type: "GET_QUERY", payload: json.data });
  };
}
export function getDetails(id) {
  return async function (dispatch) {
    let json = await axios.get("http://localhost:3001/recipes/" + id);
    return dispatch({ type: "GET_DETAIL", payload: json.data });
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
    try {
      return dispatch({
        type: "FILTER_NAME",
        payload: payload,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
