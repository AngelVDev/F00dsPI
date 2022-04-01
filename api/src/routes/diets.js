const { Router } = require('express');

const router = Router();
const axios = require('axios');

const { API_KEY } = process.env;
const { Diet } = require('../db');

router.get('/types', async (req, res) => {
  const apiUrl = await axios.get(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`,
  );
  const diets = apiUrl.data.results.map((el) => el.diets);
  const innerDiets = diets.flat(2);
  innerDiets.map((el) => Diet.findOrCreate({
    where: { name: el },
  }));
  const allDiets = await Diet.findAll();
  res.json(allDiets);
});
module.exports = router;
/*
const ids = arr.map(o => o.id)
const filtered = arr.filter(({id}, index) => !ids.includes(id, index + 1)) */
