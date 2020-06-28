const { Joi, Segments, celebrate } = require('celebrate')

function TorrentAddAndStartValidator() {
    return celebrate({
        [Segments.BODY]: Joi.object().keys({
            titulo: Joi.string().required(),
            magnetLink: Joi.string()
                .required()
                .pattern(new RegExp(/magnet:\?xt=urn:btih:[a-zA-Z0-9]*/i))
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