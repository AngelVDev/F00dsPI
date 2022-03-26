require("dotenv").config();
const { Recipe, Diet } = require("../db");
const axios = require("axios");
const { API_KEY } = process.env;

const getApiInfo = async () => {
  const apiUrl = await axios.get(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
  );
  const bunchRecipes = await apiUrl.data.results.map((food) => {
    return {
      id: food.id,
      image: food.image,
      title: food.title,
      summary: food.summary,
      score: food.spoonacularScore,
      h_score: food.healthScore,
      steps: food.analyzedInstructions
        .map((el) => {
          return el.steps.map((el) => {
            return el.step;
          });
        })
        .flat(),
      diets: food.diets,
      price: food.pricePerServing,
    };
  });
  return bunchRecipes;
};

const getDbInfo = async () => {
  return await Recipe.findAll({
    include: {
      model: Diet,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
};

const getAllRecipes = async () => {
  const apiInfo = await getApiInfo();
  const dbInfo = await getDbInfo();
  const allInfo = apiInfo.concat(dbInfo);
  return allInfo;
};

module.exports = { getAllRecipes };
