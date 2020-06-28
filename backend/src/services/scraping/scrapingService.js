const rp = require('request-promise');
const $ = require('cheerio');
const endpoint = require('../url');
const extractmovie = require('../scraping/extractMovieData');
const { ErrorHandler } = require('../../helpers/error')

async function GetScraping(url) {

    try {

        var response = await rp(url);

    } catch (error) {

        throw new ErrorHandler(404, "A página não foi encontrada");

    }

    return response;

}

async function getMoviesInHome(page) {

    var html = await GetScraping(endpoint.urlMovieHome(page));

    try {

        var data = extractmovie.getMovieDataInHome(html);

    } catch (error) {
        throw new ErrorHandler(500, "Houve um erro durante a extração de dados da página");
    }

    return data;

}

async function getMoviesBySearch(page, search) {

    var html = await GetScraping(endpoint.urlMovieBySearch(page, search));

    try {

        var data = extractmovie.getMovieDataInSearch(html);

    } catch (error) {
        throw new ErrorHandler(500, "Houve um erro durante a extração de dados da página")
    }

    return data;

}

async function getMoviesByGenre(page, genre) {

    var html = await GetScraping(endpoint.urlMovieByGenre(genre, page));

    try {

        var data = extractmovie.getMovieDataInSearch(html);

    } catch (error) {
        throw new ErrorHandler(404, "Houve um erro durante a extração de dados da página")
    }


    return data;

}

async function getSeries(page) {


}

async function getLinks(url) {

    var html = await GetScraping(url);

    try {

        var links = extractmovie.getMovieLinks(html);

    } catch (error) {
        throw new ErrorHandler(404, "Houve um erro durante a tentativa de extração dos links para download")
    }

    return links;
}

module.exports = {
    getMoviesInHome,
    getMoviesByGenre,
    getSeries,
    getLinks,
    getMoviesBySearch
}

