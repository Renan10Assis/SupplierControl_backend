import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('fornecedores_itens', table => {
        table.increments('for_item_codigo').primary();
        table.integer('for_item_codigoItem').unsigned().notNullable();
        table.integer('for_item_codigoFornc').unsigned().notNullable();
        table.foreign('for_item_codigoItem').references('itens.item_codigo');
        table.foreign('for_item_codigoFornc').references('fornecedores.for_codigo');
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('fornecedores_itens');
}