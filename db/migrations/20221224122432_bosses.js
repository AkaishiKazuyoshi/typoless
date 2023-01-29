/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("bosses",function(table){
    table.increments("id").primary();
    table.string("name").notNullable();
    table.bigInteger("maxHP").notNullable();
    table.boolean("is_beated").defaultTo(false).notNullable();
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("bosses");
};
