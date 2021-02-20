
exports.up = function(knex) {
    return knex.schema
    .table('movie', function (table) {
       table.string('nota');
       table.string('idioma');
       table.string('link');
       table.string('qualidade');
       table.unique(['titulo','id']);
    });
};

exports.down = function(knex) {
    return knex.schema.table('movie', function(table) {
        table.dropColumn('nota');
        table.dropColumn('idioma');
        table.dropColumn('link');
        table.dropColumn('qualidade');
    });
};
