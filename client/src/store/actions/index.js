import axios from "axios";

export function getRecipes() {
  return async function (dispatch) {
    try {
      const response = await axios.get("http://localhost:3001/recipes");
      let json = response.data;
      dispatch({ type: "GET_RECIPES", payload: json });
    } catch (error) {
      return console.log("El error es éste, papu", error);
    }
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
    try {
      let json = await axios.get("http://localhost:3001/recipes/" + id);
      return dispatch({ type: "GET_DETAIL", payload: json.data });
    } catch (error) {
      console.log("Qué pelotudo que está el día", error);
    }
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
