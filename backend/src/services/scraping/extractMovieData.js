const $ = require('cheerio');
const movieDao = require('../../DAO/movieDao')

const tiposGenero = ["AÇÃO", "ACTION & ADVENTURE", "ANIMAÇÃO", "ANIMES", "AVENTURA", "BIOGRAFIA",
    "COMÉDIA", "COMÉDIA ROMÂNTICA", "DOCUMENTÁRIO", "DRAMA", "FANTASIA", "CRIME", "FAMÍLIA", "FICÇÃO CIENTIFICA",
    "SCI-FI & FANTASY", "GUERRA", "HISTÓRIA", "HORROR", "MUSICAL", "NACIONAL", "POLICIAL", "ROMANCE", "SUSPENSE",
    "TERROR", "THRILLER", "MISTÉRIO", "3D", "3D HSBS", "HD 4K", "SERIES"];

function getMovieDetails(item) {

    let movieDetail = [];

    movieDetail.push({
        Titulo: $(item).children('h2').text() || '',
        Nota: $($(item).children('.data')[0]).children('span:nth-child(1)').text().split(":")[1].trim() || '',
        Idioma: $($(item).children('.data')[0]).children('span:nth-child(2)').text() || '',
        ImgSrc: $(item).children('.peli').find('img').attr('src') || '',
        Link: $(item).children('.peli').find('a').attr('href') || '',
        Genero: $(item).find('.tt-category').find('a').map((index, element) => $(element).text()).filter((i, e) => FiltrarGeneros(e)).toArray().join(",") || '',
        Qualidade: $($(item).children('.data')[1]).find('.quality').text() || ''
    });

    return movieDetail;
}

function isSerie(field) {
    return field.toUpperCase().includes('SERIES');
}

function FiltrarGeneros(genero) {
    return tiposGenero.includes(genero.toUpperCase());
}

function getMovieDataInHome(html) {

    var listmovies = $('.box:nth-child(2) .ItemN', html);

    var dataResponse = getMovieData(listmovies);

    return dataResponse;

}

function getMovieDataInSearch(html) {

    var listmovies = $('.ItemN', html);

    var dataResponse = getMovieData(listmovies);

    return dataResponse;
}

function getMovieData(listmovies) {

    var allmoviewData = [];

    listmovies.each((index, item) => {

        var movieData = [];

        movieData.push(...getMovieDetails(item));

        allmoviewData.push(...movieData);

    });

    return allmoviewData.filter(element => !isSerie(element.Genero));

}

function getMovieLinks(html) {

    var links = $('.info_caja a[href^="magnet:?x"]', html);

    var data = $(links).map((index, element) => {
        return {
            Href: $(element).attr('href'),
            Title: $(element).text()
        }
    }).toArray();

    return data;

}


module.exports = {
    getMovieDataInHome,
    getMovieDataInSearch,
    getMovieLinks,
}