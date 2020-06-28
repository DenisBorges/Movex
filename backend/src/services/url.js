module.exports = (function Endpoint() {

    var urlDefault = "http://www.megatorrentshd.org/";

    function urlMovieHome(page) {
        return `${urlDefault}/page/${page}`;
    }

    function urlMovieByGenre(genre, page) {
        return `${urlDefault}/${genre}/page/${page}`;
    }

    function urlMovieBySearch(page, search) {
        return `${urlDefault}/page/${page}/?s=${search}`;
    }

    function urlSerieHome(page) {
        return `${urlDefault}/series/page/${page}`;
    }

    return {
        urlMovieHome,
        urlMovieByGenre,
        urlSerieHome,
        urlMovieBySearch
    }

})();