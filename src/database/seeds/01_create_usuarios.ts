import Knex from 'knex';

// ao executar seeds popula a tabela Categorias com esses registros (opcional)
export async function seed(knex: Knex) {
    await knex('usuarios').insert([
        {usu_login: "fatecitu",usu_senha: "admin"}
    ]);    
}
