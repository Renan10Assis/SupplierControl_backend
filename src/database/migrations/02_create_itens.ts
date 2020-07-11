import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('itens', table => {
        table.increments('item_codigo').primary();
        table.string('item_name').notNullable();
        table.string('item_category').notNullable();
        table.string('item_detail').notNullable();
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('itens');
}