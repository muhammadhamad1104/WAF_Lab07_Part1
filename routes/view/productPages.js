// routes/view/productPages.js
const express = require('express');
const c = require('../../controllers/productController');
const router = express.Router();

// Pages
router.get('/', (_req, res) => res.render('home'));
router.get('/products', c.uiList);
router.get('/products/new', c.uiNewForm);
router.post('/products', c.uiCreate);
router.get('/products/:id', c.uiShow);
router.get('/products/:id/edit', c.uiEditForm);
router.post('/products/:id', c.uiUpdate);   // simple POST for update (no extra libs)
router.post('/products/:id/delete', c.uiDelete);

module.exports = router;
