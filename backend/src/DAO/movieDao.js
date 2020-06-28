const connection = require('../infra/connection');
const TABLENAME = 'movie';

module.exports = {

    GetAllMovies: async function () {
        return await connection(TABLENAME).select();
    },
    GetMovie: async function (obj) {
        return await connection(TABLENAME)
            .select()
            .where({
                titulo: obj.titulo,
                magnetLink: obj.magnetLink
            });
    },
    GetMovieByTitle: async function (titulo) {
        return await connection(TABLENAME)
            .first({ titulo: Titulo });
    },
    GetMoviesSaved: async function (titles) {
        return await connection(TABLENAME).where(builder => builder.whereIn('titulo', titles));
    },
    GetMovieById: async function (id) {
        return await connection(TABLENAME).first({ id });
    },
    SaveMovie: async function (obj) {
        await connection(TABLENAME).insert(obj);
    },
    UpdateMovie: async function (obj) {
        await connection(TABLENAME).first({ id: obj.id }).update(obj);
    }
};