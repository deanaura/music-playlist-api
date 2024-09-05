# Music Playlist API
This API allows users to create playlists, manage songs in playlists, and perform song searches. The API is built using Node.js, Express, and MongoDB. It supports CRUD operations for playlists and songs, as well as search functionality with validation.

## Features
- Create and manage playlists.
- Add and remove songs from playlists.
- Search songs by title and artist with query parameter validation.
- ID validation for playlist and song operations.
- Centralized error handling.

## Dependencies
- **express:** Web framework for building the API.
- **mongoose:** MongoDB object modeling for Node.js.
- **body-parser:** Middleware for parsing incoming request bodies.
- **dotenv:** For loading environment variables from `.env` files.

## Usage
To use the API, send requests to the specified endpoints. The API can be used to create and manage playlists and songs, as well as perform song searches.

## API Endpoint

### Playlist

  **1. Create Playlist**

  - **Method:** `POST /playlists`
  - **Body:**
      ```json
      {
        "name": "Chill Vibes"
      }
  - **Response:** 201 Created


  **2. Get All Playlists**

  - **Method:** `GET /playlists`
  - **Response:** 200 OK


  **3. Add Song to Playlist**

  - **Method:** `POST /playlists/:playlistId/songs/:songId`
  - **Response:** 200 OK
    

  **4. Remove Song from Playlist**

  - **Method:** `DELETE /playlists/:playlistId/songs/:songId`
  - **Response:** 200 OK


### Songs

  **1. Create Song**

  - **Method:** `POST /songs`
  - **Body:**
      ```json
      {
        "title": "Song Title",
        "artist": "Artist Name"
      }
  - **Response:** 201 Created


  **2. Get All Songs**

  - **Method:** `GET /songs`
  - **Response:** 200 OK


   **3. Search Songs**

  - **Method:** `GET /songs/search`
  - **Query Parameters:**
      - `title` (optional)
      - `artist` (optional)
  - **Response:** 200 OK


### Validation
  - Playlist and song IDs are validated using `validateId` middleware.
  - Query parameters for searching songs are validated using `validateQueryParams` middleware.


## Error Handling

The API uses centralized error handling through the `errorHandler` middleware. Common error responses include:

- **400 Bad Request:** Invalid playlist/song ID or invalid query parameters.
- **404 Not Found:** Playlist or song not found.
- **500 Internal Server Error:** General server errors.
