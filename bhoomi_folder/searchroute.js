const express = require('express');
const router = express.Router();
const { searchBuilding } = require('../controller/searchController');

router.get('/search', searchBuilding);

module.exports = router;