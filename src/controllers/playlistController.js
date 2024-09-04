const Playlist = require('../models/playlist');
const Song = require('../models/song');

exports.createPlaylist = async (req, res, next) => {
  try {
    if (!req.body.name) {
      const err = new Error('Playlist name is required');
      err.status = 400;
      throw err;
    }

    const playlist = new Playlist({ name: req.body.name });
    await playlist.save();
    res.status(201).json(playlist);
  } catch (err) {
    next(err);
  }
};

exports.getPlaylists = async (req, res, next) => {
  try {
    const playlists = await Playlist.find().populate('songs');
    res.status(200).json(playlists);
  } catch (err) {
    next(err);
  }
};

exports.addSongToPlaylist = async (req, res, next) => {
  try {
    const { playlistId, songId } = req.params;

    const playlist = await Playlist.findById(playlistId);
    if (!playlist) return res.status(404).json({ message: 'Playlist not found' });

    const song = await Song.findById(songId);
    if (!song) return res.status(404).json({ message: 'Song not found' });

    playlist.songs.push(song);
    await playlist.save();

    const updatedPlaylist = await Playlist.findById(playlistId).populate('songs');
    res.status(200).json(updatedPlaylist);
  } catch (err) {
    next(err);
  }
};

exports.removeSongFromPlaylist = async (req, res, next) => {
  try {
    const { playlistId, songId } = req.params;

    const playlist = await Playlist.findById(playlistId);
    if (!playlist) return res.status(404).json({ message: 'Playlist not found' });

    playlist.songs = playlist.songs.filter(song => song.toString() !== songId);
    await playlist.save();
    res.status(200).json(playlist);
  } catch (err) {
    next(err);
  }
};
