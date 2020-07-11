import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('fornecedores', table => {
        table.increments('for_codigo').primary();
        table.string('for_cnpj').notNullable();
        table.string('for_razaoSoc').notNullable();
        table.string('for_telefone').notNullable();
        table.string('for_celular').notNullable();
        table.string('for_email').notNullable();
        table.string('for_endereco').notNullable();
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('fornecedores');
}