const initialState = {
  recipes: [],
  allRecipes: [],
  diets: [],
  recipeDetail: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_RECIPES":
      return {
        ...state,
        recipes: action.payload,
        allRecipes: action.payload,
      };
    case "GET_TYPES":
      return {
        ...state,
        diets: action.payload,
      };
    case "GET_QUERY":
      return {
        ...state,
        recipes: action.payload,
      };
    case "GET_DETAIL":
      return {
        ...state,
        recipeDetail: action.payload,
      };
    case "POST_RECIPE":
      return {
        ...state,
      };
    case "FILTER_NAME":
      const sorted =
        action.payload === "ASC"
          ? state.dogs.sort((a, b) => {
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0;
            })
          : state.dogs.sort((a, b) => {
              if (a.name > b.name) {
                return -1;
              }
              if (a.name > b.name) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        recipes: sorted,
      };
    default:
      return {
        state,
      };
  }
}
export default rootReducer;
