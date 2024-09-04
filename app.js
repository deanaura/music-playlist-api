const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const playlistRoutes = require('./src/routes/playlists');
const songRoutes = require('./src/routes/songs');
const errorHandler = require('./src/utils/errorHandler');
const { validateId, validateQueryParams } = require('./src/middleware/validateId');
require('dotenv').config(); 

const app = express();

// middleware
app.use(bodyParser.json());
app.use('/playlists', validateId, playlistRoutes); 
app.use('/songs', validateId, validateQueryParams, songRoutes); 
app.use(errorHandler);

// koneksi ke MongoDB
const dbURI = process.env.MONGODB_URI;
mongoose.connect(dbURI)
  .then(() => {
    console.log('Connected to MongoDB');
    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`Server running on port ${port}`));
  })
  .catch(err => console.error('Error connecting to MongoDB:', err));
