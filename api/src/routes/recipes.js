const { Router } = require('express');

const router = Router();
const { Recipe, Diet } = require('../db');
const { getAllRecipes } = require('../controllers/recipesController');

router.get('/recipes', async (req, res) => {
  const { title } = req.query;
  const totalRecipes = await getAllRecipes();
  try {
    /* Try para el query */
    if (title) {
      // eslint-disable-next-line max-len
      const titleRecipe = await totalRecipes.filter((el) => el.title.toLowerCase().includes(title.toLowerCase()));
      // eslint-disable-next-line no-unused-expressions
      titleRecipe.length
        ? res.status(200).send(titleRecipe)
        : res.status(404).send('Recipe not found');
    } else {
      res.status(200).send(totalRecipes);
    }
  } catch (err) {
    console.log(err);
  }
});

router.get('/recipes/:id', async (req, res) => {
  const { id } = req.params;
  const idRecipe = await getAllRecipes();
  let idFormat = 0;
  if (id.length < 7) {
    idFormat = parseInt(id);
  } else {
    idFormat = id;
  }
  const recipeById = await idRecipe.filter((el) => el.id === idFormat);
  if (recipeById.length) {
    res.status(200).send(recipeById);
  } else {
    res.status(404).send('recipe not found or wrong id');
  }
});
router.post('/recipes', async (req, res) => {
  const {
    id, title, summary, score, hScore, steps, diets, price,
  } = req.body;

  const recipeNew = await Recipe.create({
    id,
    title,
    summary,
    score,
    hScore,
    steps,
    price,
  });

  const dietDb = await Diet.findAll({ where: { name: diets } });
  recipeNew.addDiet(dietDb);

  res.send('Recipe added : ¡SUCCESS!');
});

module.exports = router;
