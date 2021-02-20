const { Joi, Segments, celebrate } = require('celebrate')

function TorrentAddAndStartValidator() {
    return celebrate({
        [Segments.BODY]: Joi.object().keys({
            id: Joi.number(),
            Titulo: Joi.string().required(),
            Nota: Joi.string().required(),
            Idioma: Joi.string().required(),
            ImgSrc: Joi.string().required(),
            Link: Joi.string().required(),
            Genero: Joi.string().required(),
            Qualidade: Joi.string().required(),
            isDownloaded: Joi.bool().required(),
            magnetLink: Joi.object().keys({
                idMovie: Joi.number(),
                Title: Joi.string(),
                Href: Joi.string().required()
                .pattern(new RegExp(/magnet:\?xt=urn:btih:[a-zA-Z0-9]*/i))
            }).required()
        })
    })
}

function TorrentGetByNameValidator() {

}

function TorrentGetByIdValidator() {


}

module.exports = {
    TorrentAddAndStartValidator
}