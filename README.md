executar: 
1 - npm install
2 - npm run knex:migrations
3 - npm run knex:seed



rotas:

--------------------------Autenticar usuário -------------------
GET
http://localhost:3333/usuarios/auth

Formato de entrada:
{
    usu_login: "fatecitu",
    usu_senha: "admin"
}
resposta da requisição: true|false


---------------------------Lista de itens por categoria ---------------------
GET
http://localhost:3333/itens

Formato de entrada:
{
    "item_categoria": "Materiais de aula",
}



---------------------------Criar novo item ---------------------
POST
http://localhost:3333/itens

Formato de entrada:
{
    "item_nome": "Caneta esferográfica BIC",
    "item_categoria": "Materiais de aula",
    "item_detalhes": "Cores: azul, vermelho, preto"
}

resposta da requisição: true|false

---------------------------Lista de todos os Fornecedores----------------------
GET
http://localhost:3333/fornecedores


---------------------------Lista de Fornecedores de acordo com o item----------------------
GET
http://localhost:3333/for-itens

formato de entrada:
{
    "item_codigo": 1
}

busca os fornecedores de acordo com o ID do item


---------------------------Criar Fornecedor----------------------
POST
http://localhost:3333/fornecedores

Formato de entrada:
{
    "for_razaoSoc": "Papelaria JPO",
    "for_telefone": "114456-2514",
    "for_celular": "1197854-2645",
    "for_email": "atend@jpo.com.br",
    "for_endereco":"rua Rui Barbosa, 512, Centro, Salto - SP"
}



------------------------------Associar Fornecedor ao Item--------------
POST
http://localhost:3333/for-itens

formato de entrada:
{
    "item_codigo": 1,
    "for_codigo": 3
}

Pega o id do item e associa com o id do fornecedor

-------------------------------------------------------------------------
-------------------------------------------------------------------------