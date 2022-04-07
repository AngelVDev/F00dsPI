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
  return async function (dispatch){
    try{
        var json= await axios.get("http://localhost:3001/recipes/" + id);
        console.log(json.data)
        return dispatch({
            type: "GET_DETAIL",
            payload: json.data
        })
    } catch(error){
        console.log(error)
    }
}
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
        payload
      });
    } catch (error) {
      console.log(error);
    }
  };
}
export function showCreated(payload){
  return async(dispatch)=>{
    try{
      return dispatch({
        type: "FILTER_CREATEDS",
        payload
      })
    }catch(error){console.log(error)}
    }
}
export function filterByDiet(payload){
  return {
      type: "FILTER_BY_DIET",
      payload
  };
};
export function orderByScore(payload){
  return{
      type: "ORDER_BY_SCORE",
      payload
  };
};