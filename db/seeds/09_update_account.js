/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('account')
    .where("id",1).update({name: 'RION_CP',password:'0000',high_score:null,icon:"Seal.png"})
  await knex('account')
    .where("id",2).update({name: 'KOIKE_CP',password:'0000',high_score:null,icon:"Squid.png"})
  await knex('account')
    .where("id",3).update({name: 'TSUKIYAMA_CP',password:'0000',high_score:null,icon:"Cow.png"})
  await knex('account')
    .where("id",4).update({name: 'AKAISHI_CP',password:'0000',high_score:null,icon:"Horse.png"})
  await knex('account')
    .where("id",5).update({name: 'AIDA_CP',password:'0000',high_score:null,icon:"Wolf.png"})
  await knex('account')
    .where("id",6).update({name: 'TAHARA_CP',password:'0000',high_score:null,icon:"Hippo.png"})
  await knex('account')
    .where("id",7).update({name: 'koike2_CP',password:'0000',high_score:null,icon:"Fox.png"})
  await knex('account')
    .where("id",8).update({name: 'tsukiyama2_CP',password:'0000',high_score:null,icon:"Giraffe.png"})
  await knex('account')
    .where("id",9).update({name: 'akaishi2_CP',password:'0000',high_score:null,icon:"Bear.png"})
  await knex('account')
    .where("id",10).update({name: 'aida2_CP',password:'0000',high_score:null,icon:"Koala.png"})
  await knex('account')
    .where("id",11).update({name: 'rion3_CP',password:'0000',high_score:null,icon:"Monkey.png"})
  await knex('account')
    .where("id",12).update({name: 'koike321_CP',password:'0000',high_score:null,icon:"Deer.png"})
  await knex('account')
    .where("id",13).update({name: 'tsukiyama3_CP',password:'0000',high_score:null,icon:"PlarBear.png"})
  await knex('account')
    .where("id",14).update({name: 'akaishi3_CP',password:'0000',high_score:null,icon:"Elephant.png"})
  await knex('account')
    .where("id",15).update({name: 'aida3_CP',password:'0000',high_score:null,icon:"Raccoon.png"})
  await knex('account')
    .where("id",16).update({name: 'rion4_CP',password:'0000',high_score:null,icon:"Chimpanzee.png"})
  await knex('account')
    .where("id",17).update({name: 'koike4_CP',password:'0000',high_score:null,icon:"Bird.png"})
  await knex('account')
    .where("id",18).update({name: 'tsukiyama4_CP',password:'0000',high_score:null,icon:"Cat.png"})
  await knex('account')
    .where("id",19).update({name: 'akaishi4_CP',password:'0000',high_score:null,icon:"Panda.png"})
  await knex('account')
    .where("id",20).update({name: 'aida4_CP',password:'0000',high_score:null,icon:"Sheep.png"})
  await knex('account')
    .where("id",21).update({name: 'rion5_CP',password:'0000',high_score:null,icon:"Chick.png"})
  await knex('account')
    .where("id",22).update({name: 'koike5_CP',password:'0000',high_score:null,icon:"Pig.png"})
  await knex('account')
    .where("id",23).update({name: 'tsukiyama5_CP',password:'0000',high_score:null,icon:"Penguin.png"})
  await knex('account')
    .where("id",24).update({name: 'akaishi5_CP',password:'0000',high_score:null,icon:"Seal.png"})
  await knex('account')
    .where("id",25).update({name: 'aida5_CP',password:'0000',high_score:null,icon:"Squid.png"})
  await knex('account')
    .where("id",26).update({name: 'rion6_CP',password:'0000',high_score:null,icon:"Cow.png"})
  await knex('account')
    .where("id",27).update({name: 'koike6_CP',password:'0000',high_score:null,icon:"Horse.png"})
  await knex('account')
    .where("id",28).update({name: 'tsukiyama6_CP',password:'0000',high_score:null,icon:"Wolf.png"})
  await knex('account')
    .where("id",29).update({name: 'akaishi6_CP',password:'0000',high_score:null,icon:"Hippo.png"})
  await knex('account')
    .where("id",30).update({name: 'aida6_CP',password:'0000',high_score:null,icon:"Fox.png"})
  await knex('account')
    .where("id",31).update({name: 'rion7_CP',password:'0000',high_score:null,icon:"Giraffe.png"})
  await knex('account')
    .where("id",32).update({name: 'koike3_CP',password:'0000',high_score:null,icon:"Bear.png"})
  await knex('account')
    .where("id",33).update({name: 'tsukiyama7_CP',password:'0000',high_score:null,icon:"Koala.png"})
  await knex('account')
    .where("id",34).update({name: 'akaishi7_CP',password:'0000',high_score:null,icon:"Monkey.png"})
  await knex('account')
    .where("id",35).update({name: 'aida7_CP',password:'0000',high_score:null,icon:"Deer.png"})
};