import knex from '../connection';
import {Request, Response} from 'express';

class ItensController{

    async show(request: Request, response: Response){
        const itens = await knex('itens').select('*');

        //serializedFornecedores...

        return response.json(itens);
    }

    async create(request: Request, response: Response){
        const {
            item_nome,
            item_categoria,
            item_detalhes

        } = request.body;

        const item ={
            item_nome,
            item_categoria,
            item_detalhes

        }

        await knex('itens').insert(item);


        return response.json('sucesso');


    }

    


}
export default ItensController;