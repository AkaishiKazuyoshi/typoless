/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    knex.schema.createTable("raid_boss_damage_history",function(table){
        table.bigInteger("boss_id").notNullable();
        table.bigInteger("account_id").notNullable();
        table.bigInteger("damage").notNullable();
        table.timestamp("date").notNullable();

        table.foreign("boss_id").references("id").inTable("bosses");
        table.foreign("account_id").references("id").inTable("account");
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    knex.schema.dropTable("raid_boss_damage_history");
};
