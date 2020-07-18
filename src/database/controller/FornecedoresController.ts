import knex from '../connection';
import {Request, Response} from 'express';

class FornecedoresController{

    async show(request: Request, response: Response){
        const fornecedores = await knex('fornecedores').select('*');

        //serializedFornecedores...

        return response.json(fornecedores);
    }

    async create(request: Request, response: Response){
        const {
            for_cnpj,
            for_razaoSoc,
            for_telefone,
            for_celular,
            for_email,
            for_endereco

        } = request.body;

        const fornecedor ={
            for_cnpj,
            for_razaoSoc,
            for_telefone,
            for_celular,
            for_email,
            for_endereco

        }

        const insertId = await knex('fornecedores').insert(fornecedor);


        return response.json('sucesso');


    }

    


}
export default FornecedoresController;