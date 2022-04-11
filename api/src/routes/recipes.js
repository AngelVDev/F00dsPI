const { Router } = require('express');

const router = Router();
const { Recipe, Diet } = require('../db');
const { getAllRecipes } = require('../controllers/recipesController');

router.get('/search/:id', async (req, res) => {
  const { id } = req.params;
  const back = await getAllRecipes();
  if (id.length) {
    const recipeById = await back.filter((e) => e.id === id);
    res.status(200).json(recipeById);
  }
});
router.get('/recipes', async (req, res, next) => {
  const { title } = req.query;
  const totalRecipes = await getAllRecipes();
  console.log(totalRecipes.price);
  /* Try para el query */
  if (title) {
    try {
      // eslint-disable-next-line max-len
      const titleRecipe = await totalRecipes?.filter((e) => e.title.includes(title.toLowerCase()));
      // eslint-disable-next-line no-unused-expressions
      !titleRecipe
        ? res.status(404).send('Recipe not found')
        : res.status(200).json(titleRecipe);
    } catch (err) {
      next(err);
    }
  } else {
    res.status(200).json(totalRecipes);
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
      steps: [steps],
      price,
    });

    const dietDb = await Diet.findAll({ where: { name: diets } });
    recipeNew.addDiet(dietDb);

    res.status(201).json(recipeNew);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
