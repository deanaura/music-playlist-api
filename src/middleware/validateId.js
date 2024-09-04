const mongoose = require('mongoose');

const validateId = (req, res, next) => {
  const { playlistId, songId } = req.params;

  if (playlistId && !mongoose.Types.ObjectId.isValid(playlistId)) {
    return res.status(400).json({ message: 'Invalid Playlist ID format' });
  }

  if (songId && !mongoose.Types.ObjectId.isValid(songId)) {
    return res.status(400).json({ message: 'Invalid Song ID format' });
  }

  next();
};

// Middleware to validate query parameters for search
const validateQueryParams = (req, res, next) => {
  const { title, artist } = req.query;

  if (title && (title.length < 1 || title.length > 100)) {
    return res.status(400).json({ message: 'Invalid title parameter' });
  }

  if (artist && (artist.length < 1 || artist.length > 100)) {
    return res.status(400).json({ message: 'Invalid artist parameter' });
  }

  next();
};

module.exports = { validateId, validateQueryParams };
