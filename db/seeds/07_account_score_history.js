/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('account_score_history').del()
  await knex('account_score_history').insert([
    { account_id: 1, score:40.03, timestamp: "2022-12-23 10:00:00"},
    { account_id: 2, score:39.03, timestamp: "2022-12-24 11:00:00"},
    { account_id: 3, score:38.03, timestamp: "2022-12-25 10:00:00"},
    { account_id: 4, score:37.03, timestamp: "2022-12-26 10:00:00"},
    { account_id: 5, score:36.03, timestamp: "2022-12-27 10:00:00"},

  ]);
};
