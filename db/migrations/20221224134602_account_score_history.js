/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    knex.schema.createTable("account_score_history",function(table){
        table.bigInteger("account_id").notNullable();
        table.bigInteger("score").notNullable();
        table.timestamp("date").notNullable();

        table.foreign("account_id").references("id").inTable("account");
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    knex.schema.dropTable("account_score_history");
};
