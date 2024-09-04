const express = require('express');
const router = express.Router();
const songController = require('../controllers/songController');
const { validateId, validateQueryParams } = require('../middleware/validateId');

router.post('/', songController.createSong);
router.get('/search', validateQueryParams, songController.searchSongs);

module.exports = router;
