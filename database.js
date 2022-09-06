let knex;

if (process.env.DATABASE_URL){
    console.log('Connected to db via DATABASE_URL');
    knex = require('knex')({
      client: 'cockroachdb',
      connection: process.env.DATABASE_URL
    });
} else {
    console.log('Connected to local db');
    knex = require('knex')({
      client: 'pg',
      version: '11.1',
      connection: {
        host : '127.0.0.1',
        user : 'vyper374',
        password : '',
        database : 'smart-brain'
      }
    });
}

// knex.schema.dropTableIfExists('users').then(() => {
//     return knex.schema.hasTable('users');
// })

knex.schema.hasTable('users').then(exists => {
    if (!exists){
        return knex.schema.createTable('users', t => {
            t.increments('id').primary();
            t.string('name', 100);
            t.string('email', 100).unique().notNullable();
            t.bigInteger('entries').defaultTo(0);
            t.timestamp('joined').defaultTo(knex.fn.now()).notNullable();
        });
    }
}).catch(err => {
    console.log(err.message);
    if (err) console.log("Can't create table: users");
});

// knex.schema.dropTableIfExists('login').then(() => {
//     return knex.schema.hasTable('login');
// })

knex.schema.hasTable('login').then(exists => {
    if (!exists){
        return knex.schema.createTable('login', t => {
            t.increments('id').primary();
            t.string('hash', 100).notNullable();
            t.string('email', 100).unique().notNullable();
        });
    }
}).catch(err => {
    if (err) console.log("Can't create table: login");
});

module.exports = knex;