/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.alterTable("raid_boss_damage_history",function(table){
        table.dropColumn("account_id");
        table.string("account_name");

        table.foreign("account_name").references("name").inTable("account");
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.alterTable("raid_boss_damage_history",function(table){
        table.dropColumn("account_name");
        table.integer("account_id");

        table.foreign("account_id").references("id").inTable("account");
    })
};
