const $ = require('cheerio');

function getSerieDetails(item) {

    let movieDetail = [];

    movieDetail.push({
        Titulo: $(item).children('h2').text(),
        Nota: $($(item).children('.data')[0]).children('span:nth-child(1)').text(),
        Idioma: $($(item).children('.data')[0]).children('span:nth-child(2)').text(),
        ImgSrc: $(item).children('.peli').find('img').attr('src'),
        Link: $(item).children('.peli').find('a').attr('href'),
        Genero: $(item).find('.tt-category').find('a').map((index, element) => $(element).text()).toArray().join(","),
        Qualidade: $($(item).children('.data')[1]).find('.quality').text()
    });

    return movieDetail.filter(element => !isSerie(element.Genero));
}

function isSerie(field) {
    return field.toUpperCase().includes('SERIES');
}

function getMovieData(html) {

    var listmovies = $('.box:nth-child(2) .ItemN', html);

    var allmoviewData = [];

    listmovies.each((index, item) => {

        var movieData = [];

        movieData.push(...getMovieDetails(item));

        allmoviewData.push(...movieData);

    });

    return allmoviewData;

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
    getMovieData,
    getMovieLinks,
}