const Song = require('../models/song');

exports.createSong = async (req, res, next) => {
  try {
    if (!req.body.title || !req.body.artist) {
      const err = new Error('Title and artist are required');
      err.status = 400;
      throw err;
    }

    const song = new Song(req.body);
    await song.save();
    res.status(201).json(song);
  } catch (err) {
    next(err);
  }
};

exports.getAllSongs = async (req, res) => {
    try {
      const songs = await Song.find();
      res.status(200).json(songs);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
};  
  
exports.searchSongs = async (req, res, next) => {
    try {
      const { title, artist } = req.query;
      const query = {};
      if (title) query.title = new RegExp(title, 'i');
      if (artist) query.artist = new RegExp(artist, 'i');
  
      const songs = await Song.find(query);
      res.status(200).json(songs);
    } catch (err) {
      next(err);
    }
};
