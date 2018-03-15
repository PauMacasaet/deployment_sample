// knex seed:make 01_sticker
// knex seed:run

const stickers = require('../stickers');

exports.seed = function(knex, Promise) {
  return knex('sticker').del()
    .then(function () {
      return knex('sticker').insert(stickers);
    });
};
