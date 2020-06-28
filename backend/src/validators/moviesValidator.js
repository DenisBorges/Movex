const { Joi, Segments, celebrate } = require('celebrate')

function GetAllMoviesByPageValidator() {
    return celebrate({
        [Segments.PARAMS]: Joi.object().keys({
            id: Joi.number()
        })
    })
}

function GetMoviesBySearchValidator() {
    return celebrate({
        [Segments.QUERY]: Joi.object().keys({
            page: Joi.number(),
            search: Joi.string().required()
        })
    })
}

function GetAllMoviesByGenreValidator() {
    return celebrate({
        [Segments.QUERY]: Joi.object().keys({
            page: Joi.number(),
            genre: Joi.string().required()
        })
    })
}

function GetMagnetLinksValidator() {
    return celebrate({
        [Segments.BODY]: Joi.object().keys({
            url: Joi.string().required(),
        })
    })
}


module.exports = {
    GetAllMoviesByPageValidator,
    GetAllMoviesByGenreValidator,
    GetMagnetLinksValidator,
    GetMoviesBySearchValidator
}