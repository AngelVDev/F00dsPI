const initialState = {
  recipes: [], //copia burda para hacerle magia
  allRecipes: [],//las buenas recetas
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
        allRecipes: action.payload,
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
          ? state.allRecipes.sort((a, b) => {
              if (a.title > b.title) {
                return 1;
              }
              if (b.title > a.title) {
                return -1;
              }
              return 0;
            })
          : state.allRecipes.sort((a, b) => {
              if (a.title > b.title) {
                return -1;
              }
              if (a.title > b.title) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        allRecipes: sorted,
      };
    case "FILTER_CREATEDS":
      const isCreated =
        action.payload === "API"
          ? state.allRecipes.filter((el) => el.createdInDb)
          : state.allRecipes.filter((el) => !el.createdInDb);
      return {
        ...state,
        recipes: action.payload === "ALL" ? state.allRecipes : isCreated,
      };
    case "FILTER_BY_DIET":
      const allRecipes = state.allRecipes;
      const filteredByDiet =
        action.payload === "ALL"
          ? allRecipes
          : allRecipes.filter((el) =>
              el.diets.find((el) => el === action.payload)
            );
      return {
        ...state,
        recipes: filteredByDiet,
      };
    case "ORDER_BY_SCORE":
      let sortedScore =
        action.payload === "ASC"
          ? state.allRecipes.sort((a, b) => {
              if (a.score > b.score) {
                return 1;
              }
              if (b.score > a.score) {
                return -1;
              }
              return 0;
            })
          : state.allRecipes.sort((a, b) => {
              if (a.score > b.score) {
                return -1;
              }
              if (b.score > a.score) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        recipes: sortedScore,
      };
    default:
      return {
        ...state,
      };
  }
}
export default rootReducer;
