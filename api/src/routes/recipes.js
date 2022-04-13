/* eslint-disable prefer-const */
/* eslint-disable no-console */
const { Router } = require('express');

const router = Router();
const { Recipe, Diet } = require('../db');
const { getAllRecipes } = require('../controllers/recipesController');

// eslint-disable-next-line consistent-return
router.get('/recipes', async (req, res) => {
  try {
    const { title } = req.query;

    let recipesTotal = await getAllRecipes();

    // eslint-disable-next-line no-unused-vars
    if (title) {
      // eslint-disable-next-line max-len
      const recipeTitle = recipesTotal.filter((el) => el.title.toLowerCase().includes(title.toLowerCase()));
      // eslint-disable-next-line no-unused-expressions
      recipeTitle.length
        ? res.status(200).send(recipeTitle)
        : res.status(404).send('RECIPE NOT FOUND');
    } else {
      res.status(200).json(recipesTotal);
    }
  } catch (err) {
    console.log(err);
  }
});

router.get('/recipes/:id', async (req, res) => {
  const { id } = req.params;
  const recipes = await getAllRecipes();
  try {
    const recipeById = recipes.find((element) => element.id === id);
    // Intento traer el elemento que coincida por id desde la API
    // o desde la primaryKey() en la base de datos
    if (!recipeById) {
      const recipeByDB = await Recipe.findByPk(id, {
        include: {
          model: Diet,
        },
      });
      // eslint-disable-next-line no-unused-expressions
      recipeByDB
        ? res.status(200).json(recipeByDB)
        : res.status(404).send('INVALID ID');
    } else {
      res.status(200).json(recipeById);
    }
  } catch (err) {
    console.log('\x1b[36m%s\x1b[0m', err);
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
      diets,
    });
    const dietDb = await Diet.findAll({ where: { name: diets } });
    recipeNew.addDiet(dietDb);
    res.status(201).json(recipeNew);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
