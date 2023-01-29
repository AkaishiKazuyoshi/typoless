/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('raid_boss').del()
  await knex('raid_boss').insert([
    {boss_id: 2}
  ]);
};
