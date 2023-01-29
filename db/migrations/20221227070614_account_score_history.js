/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("account_score_history",function(table){
        table.bigInteger("account_id").notNullable();
        table.float("score").notNullable();
        table.timestamp("timestamp").notNullable();

        table.foreign("account_id").references("id").inTable("account");
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("account_score_history");
};
