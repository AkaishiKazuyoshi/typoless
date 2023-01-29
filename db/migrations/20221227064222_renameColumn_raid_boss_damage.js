/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.table("raid_boss_damage",function(table){
        table.renameColumn("date","timestamp");
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.table("raid_boss_damage",function(table){
        table.renameColumn("timestamp","date");
    })
};
