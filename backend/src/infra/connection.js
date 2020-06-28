const knex = require('knex');
const configutarion = require('../../knexfile')

module.exports = knex(configutarion.development);