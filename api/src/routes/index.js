const { Router } = require('express');
const recipes = require('./recipes');
const diets = require('./diets');
const { Recipe, Diet } = require('../db');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/', recipes);
router.use('/', diets);

module.exports = router;
