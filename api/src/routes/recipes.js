const { Router } = require("express");
const router = Router();
const { getAllRecipes } = require("../controllers/recipesController");

router.get("/", async (req, res) => {
  const routeRec = await getAllRecipes();
  res.send(routeRec);
});
module.exports = router;
