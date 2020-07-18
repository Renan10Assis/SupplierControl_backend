import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('itens', table => {
        table.increments('item_codigo').primary();
        table.string('item_nome').notNullable();
        table.string('item_categoria').notNullable();
        table.string('item_detalhes').notNullable();
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('itens');
}