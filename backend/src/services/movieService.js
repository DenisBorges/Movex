
const service = require('../services/scraping/scrapingService');

async function getMoviesInHome(page) {

    var data = await service.getMoviesInHome(page);

    return data;

}

async function getMoviesBySearch(page,search){

    var data = await service.getMoviesBySearch(page,search)

    return data;

}

async function getMoviesByGenre(page, genre) {

    var data = await service.getMoviesByGenre(page,genre);

    return data;

}

async function getLinks(url) {

    var data = await service.getLinks(url);

    return data;

}




module.exports = {
    getMoviesInHome,
    getMoviesByGenre,
    getLinks,
    getMoviesBySearch
}