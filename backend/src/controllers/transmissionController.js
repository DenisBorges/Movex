const axios = require('axios');
const service = require('../services/transmission/transmissionService')
const mediaModel = require('../infra/model/mediaModel')


var TorrentAddAndStart = async function torrentAddAndStart(request, response, next) {

    try {

        const { titulo = '', magnetLink } = request.body;

        if (magnetLink == null)
            response.status(500).send("Aguardado o parametro 'magnetLink'")


        await service.TorrentAdd(magnetLink, async function (id) {

            response.status(200).send(`the torrent (id: ${id}) is started`);

        });

    } catch (error) {
        next(error);
    }

};

var TorrentGetByName = async function torrentGetByName(request, response,next) {

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



var TorrentGetById = async function torrentGetById(req,res,next) {

    try {

        const { _id } = request.body;

        await mediaModel.findById({ _id }, (err, res) => {
            if (err.length > 0) {
                console.log(err);
                response.status(500).send('Erro na consulta por id');
            }

            return response.status(200).json(res.length > 0);

        })

    } catch (error) {
        next(error);
    }

};

var GetAllActiveTorrents = async function getAllActiveTorrents(req,res,next) {

    try {

        await service.GetAllActiveTorrents(async function(data){
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


module.exports = {
    TorrentAddAndStart,
    GetAllActiveTorrents,
    TorrentGetByName,
    FreeSpace
}