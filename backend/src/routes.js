const { Router } = require('express');
const moviesController = require('./controllers/moviesController');
const transmissionController = require('./controllers/transmissionController');
const moviesValidator = require('./validators/moviesValidator');
const transmissionValidator = require('./validators/transmissionValidator');


const route = Router();

//MOVIES

/**
 * @swagger
 * /movies/getmoviesbypage/{id}:
 *   get:
 *     description: Login to the application
 *     tags: [Movie]
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: User's password.
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: movies
 *         schema:
 *           type: object
 */
route.get('/movies/getmoviesbypage/:id?',
  moviesValidator.GetAllMoviesByPageValidator(),
  moviesController.GetAllMoviesByPage);

route.get('/movies/getmoviesbygenre',
  moviesValidator.GetAllMoviesByGenreValidator(),
  moviesController.GetAllMoviesByGenre);

route.get('/movies/getmoviesbysearch',
  moviesValidator.GetMoviesBySearchValidator(),
  moviesController.GetMoviesBySearch);

route.post('/movies/getmagnetlinks',
  moviesValidator.GetMagnetLinksValidator(),
  moviesController.GetMagnetLinks);

//TRANSMISSION
route.post('/transmission/torrentaddstart',
  transmissionValidator.TorrentAddAndStartValidator(),
  transmissionController.TorrentAddAndStart);

route.post('/transmission/torrentgetbyname', transmissionController.TorrentGetByName);
route.get('/transmission/freespace', transmissionController.FreeSpace);

route.get('/transmission/getallactives', transmissionController.GetAllActiveTorrents);

module.exports = route;