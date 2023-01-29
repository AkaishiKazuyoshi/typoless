/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('raid_boss_damage').del()
  await knex('raid_boss_damage').insert([
    {boss_id: 2,account_name: "rion_CP", damage: 20, timestamp:"2019-03-01 10:00:00"},
    {boss_id: 2,account_name: "koike_CP", damage: 30, timestamp:"2019-03-02 10:00:00"},
  ]);
};
