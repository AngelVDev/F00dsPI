const { Router } = require("express");
const router = Router();
const { Recipe, Diet } = require("../db");
const { getAllRecipes } = require("../controllers/recipesController");

router.get("/recipes", async (req, res) => {
  const { title } = req.query;
  const totalRecipes = await getAllRecipes();
  if (title) {
    const titleRecipe = await totalRecipes.filter((el) =>
      el.title.toLowerCase().includes(title.toLowerCase())
    );
    titleRecipe.length
      ? res.status(200).send(titleRecipe)
      : res.status(404).send("Recipe not found");
  } else {
    res.status(200).send(totalRecipes);
  }
});

router.get("/recipes/:id", async (req, res) => {
  const id = req.params.id;
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
    res.status(404).send("recipe not found or wrong id");
  }
});
router.post("/post", async (req, res) => {
  const {
    id,
    image,
    title,
    summary,
    score,
    h_score,
    steps,
    diets,
    price,
    createdInDb,
  } = req.body;

  const recipeNew = await Recipe.create({
    id,
    image,
    title,
    summary,
    score,
    h_score,
    steps,
    price,
    createdInDb,
  });

  let dietDb = await Diet.findAll({ where: { name: diets } });
  recipeNew.addDiet(dietDb);

  res.send("Recipe added : ¡SUCCESS!");
});

module.exports = router;
