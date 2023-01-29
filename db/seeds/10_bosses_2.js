/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('bosses').insert([
    {name: 'erikosan:Lv1',maxHP:100,is_beated:true, image_name:"Erikosan"},
    {name: 'Kiki:Lv3',maxHP:300,is_beated:false, image_name:"Kikisan"},
    {name: 'Abiruman:Lv5',maxHP:500, is_beated:false, image_name:"Abirusan"},
    {name: 'Yusuke:Lv10',maxHP:1000, is_beated:false, image_name:"Yusukesan"},
    {name: 'Eriko:Lv100',maxHP:10000, is_beated:false, image_name:"Erikosan"},
  ]);
};
