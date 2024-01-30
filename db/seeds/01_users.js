const bcrypt = require("bcryptjs");

exports.seed = async function (knex) {
 // Deletes related invoices
 await knex("invoices").del();
 // Deletes users after related invoices are deleted
 await knex("users").del();
 // Inserts new user records
 await knex("users").insert([
   {
     id: 1,
     username: "Alice",
     password: bcrypt.hashSync("pass1", 14),
     adminKey: "1234",
     rank: "Plebian"
   },
   {
     id: 2,
     username: "Bob",
     password: bcrypt.hashSync("pass2", 14),
     adminKey: null,
     rank: "Plebian"
   },
 ]);
};
