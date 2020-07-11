import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('usuarios', table => {
        table.increments('usu_id').primary();
        table.string('usu_login').notNullable();
        table.string('usu_senha').notNullable();
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('usuarios');
}