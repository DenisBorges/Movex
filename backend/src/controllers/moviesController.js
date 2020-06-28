const axios = require('axios');
const service = require('../services/movieService');
const movieDao = require('../DAO/movieDao');

var GetAllMoviesByPage = async function getMoviesByPage(request, response, next) {

    try {

        debugger;

        var page = request.params.id || 1;

        let data = await CrossOverData(await service.getMoviesInHome(page));

        response.json(data);

    } catch (error) {
        next(error);
    }
};

var GetMoviesBySearch = async function getMoviesBySearch(request, response, next) {

    try {

        const { page, search } = request.query;

        let data = await service.getMoviesBySearch(page, search);

        response.json(data);

    } catch (error) {
        next(error);
    }

};


var GetAllMoviesByGenre = async function getMoviesByGenre(request, response, next) {

    try {

        const { page, genre } = request.query;

        let data = await service.getMoviesByGenre(page, genre);

        response.json(data);

    } catch (error) {
        next(error);
    }

};

var GetMagnetLinks = async function getMagnetLinks(request, response, next) {

    try {
        var url = request.body.url

        let data = await service.getLinks(url);

        response.json(data);

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