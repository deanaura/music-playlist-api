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

  console.log(`Title: ${title}, Artist: ${artist}`);

  if (title && (title.length < 1 || title.length > 30)) {
    console.log('Invalid title length'); 
    return res.status(400).json({ message: 'Invalid title parameter' });
  }

  if (artist && (artist.length < 1 || artist.length > 30)) {
    console.log('Invalid artist length'); 
    return res.status(400).json({ message: 'Invalid artist parameter' });
  }

  next();
};


module.exports = { validateId, validateQueryParams };
