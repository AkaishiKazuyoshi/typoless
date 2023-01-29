/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("raid_boss",function(table){
        table.bigInteger("boss_id").notNullable();

        table.foreign("boss_id").references("id").inTable("bosses");
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("raid_boss");
};
