import Knex from 'knex';

// ao executar seeds popula a tabela Categorias com esses registros (opcional)
export async function seed(knex: Knex) {
    await knex('Itens').insert([
        {item_nome: "Caneta esferográfica BIC",item_categoria: "Materiais de aula", item_detalhes: "cores: azul, vermelho e preto"},
        {item_nome: "Lápis FaberCastell", item_categoria: "Materiais de aula", item_detalhes: "Tipos: 2B, 4B, 6B"},
        {item_nome: "Papel sulfite Chamex", item_categoria: "Materiais de aula", item_detalhes: "Unidade com 500 folhas"},
        {item_nome: "Detergente Minuano",item_categoria: "Limpeza", item_detalhes: "500 ml"},

    ]);    
}
