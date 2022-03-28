const { Router } = require("express");
const router = Router();
const axios = require("axios");
const { API_KEY } = process.env;
const { Recipe, Diet } = require("../db");

router.get("/types", async (req, res) => {
  const apiUrl = await axios.get(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
  );
  const diets = apiUrl.data.results.map((el) => el.diets);
  const innerDiets = diets.flat(2);
  innerDiets.forEach((el) => {
    Diet.findOrCreate({
      where: { name: el.toUpperCase() },
    });
  });
  const allDiets = await Diet.findAll();
  res.send(allDiets);
});
module.exports = router;
