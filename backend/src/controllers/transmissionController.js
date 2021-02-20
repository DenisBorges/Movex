const axios = require('axios');
const service = require('../services/transmission/transmissionService')
const movieDao = require('../DAO/movieDao')




var TorrentAddAndStart = async function torrentAddAndStart(request, response, next) {

    try {

        const { magnetLink, ...movie } = request.body;

        if (magnetLink == null)
            response.status(500).send("Aguardado o parametro 'magnetLink'")

        let obj = await movieDao.GetMovie({
            titulo: magnetLink.Title,
            magnetLink: magnetLink.Href
        });

        if (obj.length == 0) {

           await movieDao.SaveMovie({
                titulo: movie.Titulo,
                genero: movie.Genero,
                idioma: movie.Idioma,
                imgSrc: movie.ImgSrc,
                link: movie.Link,
                nota: movie.Nota,
                qualidade: movie.Qualidade,
                magnetLink: magnetLink.Href,
                status: 'BAIXANDO'
            });

            await service.TorrentAdd(magnetLink.Href, async function (id) {

                response.status(200).send(`the torrent (id: ${id}) is started`);
    
            });

        } else {
            response.status(400).send('Filme já foi baixado anteriormente');
        }

      

    } catch (error) {
        next(error);
    }

};

var TorrentGetByName = async function torrentGetByName(request, response, next) {

    try {

        const { titulo } = request.body;

        await mediaModel.findOne({ titulo }, (err, res) => {

            if (err.length > 0) {
                console.log(err);
                response.status(500).send('Erro na consulta por id');
            }

            return res.send(200).json(res.length > 0)

        });

    } catch (error) {
        next(error);
    }

};



var TorrentGetById = async function torrentGetById(req, res, next) {

    try {

        const { _id } = request.body;



    } catch (error) {
        next(error);
    }

};

var GetAllActiveTorrents = async function getAllActiveTorrents(req, res, next) {

    try {

        await service.GetAllActiveTorrents(async function (data) {
            res.status(200).json(data);
        });

    } catch (error) {
        next(error);
    }
}

var FreeSpace = async function freeSpace(request, response) {

    try {

        let size = service.FreeSpace(function (size) {

            response.status(200).send(size);

        });

    } catch (error) {
        next(error);
    }

};

var VerifyTorrentData = async function verifyTorrentData(request, response) {

    try {

        var { id } =  request.params;

        await service.VerifyTorrentData(id,async function (args) {

            response.status(200).send(args);

        });

    } catch (error) {
        next(error);
    }

};


var GetById = async function getById(request, response) {

    try {

        var { id } =  request.params;

        await service.GetById(id,async function (args) {

            response.status(200).send(args);

        });

    } catch (error) {
        next(error);
    }

};

module.exports = {
    TorrentAddAndStart,
    GetAllActiveTorrents,
    TorrentGetByName,
    FreeSpace,
    VerifyTorrentData,
    GetById
}