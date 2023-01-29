/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('raid_boss_damage_history').del()
  await knex('raid_boss_damage_history').insert([
    {boss_id:1, account_name: "rion_CP", damage: 20, timestamp:"2019-03-01 10:00:00"},
    {boss_id:1, account_name: "rion_CP", damage: 30, timestamp:"2019-03-01 10:00:00"},
    {boss_id:1, account_name: "rion_CP", damage: 40, timestamp:"2019-03-01 10:00:00"},
    {boss_id:1, account_name: "koike_CP", damage: 10, timestamp:"2019-03-01 10:00:00"},

  ]);
};
