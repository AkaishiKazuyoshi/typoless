/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('bosses').del()
  await knex('bosses').insert([
    {name: 'eriko:Lv1',maxHP:100,is_beated:true},
    {name: 'eriko:Lv3',maxHP:300,is_beated:false},
    {name: 'eriko:Lv10',maxHP:1000, is_beated:false},
    {name: 'eriko:Lv100',maxHP:10000, is_beated:false},
    {name: 'eriko:Lv100',maxHP:10000, is_beated:false},
  ]);
};
