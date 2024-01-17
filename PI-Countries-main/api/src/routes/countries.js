//>>
const { Router } = require('express');
const { filterByName, filterById } = require('../controllers');
const router = Router();

router.get('/countries', filterByName);
router.get('/countries/:countryId', filterById);

module.exports = router;
//<<
