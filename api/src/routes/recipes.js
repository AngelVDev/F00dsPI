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
  const recipes = await getAllRecipes();
  const recipeById = recipes.find((element) => element.id === id);
  if (!recipeById) {
    res.status(404).send('INVALID ID');
  } else {
    res.status(200).json(recipeById);
  }
});
router.post('/recipes', async (req, res) => {
  const {
    title, summary, score, hScore, steps, diets, price,
  } = req.body;
  try {
    const recipeNew = await Recipe.create({
      title,
      summary,
      score,
      hScore,
      steps,
      price,
    });

    const dietDb = await Diet.findAll({ where: { name: diets } });
    recipeNew.addDiet(dietDb);

    res.json(recipeNew);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
