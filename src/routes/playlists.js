const express = require('express');
const router = express.Router();
const playlistController = require('../controllers/playlistController');
const { validateId } = require('../middleware/validateId');

router.post('/', playlistController.createPlaylist);
router.get('/', playlistController.getPlaylists);
router.post('/:playlistId/songs/:songId', validateId, playlistController.addSongToPlaylist);
router.delete('/:playlistId/songs/:songId', validateId, playlistController.removeSongFromPlaylist);

module.exports = router;