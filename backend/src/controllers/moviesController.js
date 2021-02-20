const axios = require('axios');
const service = require('../services/movieService');
const movieDao = require('../DAO/movieDao');
const objResponse = require('../helpers/objResponse');

var GetAllMoviesByPage = async function getMoviesByPage(request, response, next) {

    try {

        var page = request.params.id || 1;

        var res = objResponse();

        res.data = await CrossOverData(await service.getMoviesInHome(page));

        response.json(res);

    } catch (error) {
        next(error);
    }
};

var GetMoviesBySearch = async function getMoviesBySearch(request, response, next) {

    try {

        const { page, search } = request.query;

        var res = objResponse();

        res.data = await service.getMoviesBySearch(page, search);

        response.json(res);

    } catch (error) {
        next(error);
    }

};


var GetAllMoviesByGenre = async function getMoviesByGenre(request, response, next) {

    try {

        const { page, genre } = request.query;

        var res = objResponse();

        res.data = await service.getMoviesByGenre(page, genre);

        response.json(res);

    } catch (error) {
        next(error);
    }

};

var GetMagnetLinks = async function getMagnetLinks(request, response, next) {

    try {

        var url = request.body.url

        var res = objResponse();

        res.data = await service.getLinks(url);

        response.json(res);

    } catch (error) {
        next(error);
    }

};

async function CrossOverData(data) {

    var savedMovies = await movieDao.GetMoviesSaved(data.map((e, i) => e.Titulo));

    return data.map(e => {

        e.isDownloaded = savedMovies.filter(y => y.titulo == e.Titulo).length > 0;
        return e;
    });

}


module.exports = {
    GetAllMoviesByPage,
    GetAllMoviesByGenre,
    GetMagnetLinks,
    GetMoviesBySearch
}