const { Router } = require("express");
const recipes = require("../routes/recipes");
const { Recipe, Diet } = require("../db");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/recipes", recipes);

module.exports = router;
