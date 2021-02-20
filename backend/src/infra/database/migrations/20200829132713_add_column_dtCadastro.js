
exports.up = function(knex) {
    return knex.schema
    .table('movie', function (table) {
       table.datetime('dtCadastro').defaultTo(new Date());
    });
};

exports.down = function(knex) {
    return knex.schema.table('movie', function(table) {
        table.dropColumn('dtCadastro');
    });
};
