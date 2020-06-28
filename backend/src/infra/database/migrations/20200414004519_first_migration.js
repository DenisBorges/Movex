
exports.up = function(knex) {
    return knex.schema
    .createTable('movie', function (table) {
       table.increments('id');
       table.string('titulo', 60);
       table.text('magnetlink');
       table.string('imgSrc', 60);
       table.string('status',60);
       table.string('genero',60);
       table.unique(['magnetlink','id']);
    });
};

exports.down = function(knex) {
  knex.schema.dropTableIfExists('movie');
};
