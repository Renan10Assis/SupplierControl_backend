import knex from '../connection';
import { Request, Response } from 'express';

class ItensController {

    async show(request: Request, response: Response) {
        const {
            item_categoria
        } = request.body;

        const trx = await knex.transaction();

        const itens = await trx('itens')
        .select('*')
        .where('item_categoria', item_categoria);


        await trx.commit();

        return response.json(itens);
    }

    async create(request: Request, response: Response) {
        const {
            item_nome,
            item_categoria,
            item_detalhes

        } = request.body;

        const item = {
            item_nome: String(item_nome),
            item_categoria: String(item_categoria),
            item_detalhes: String(item_detalhes)

        }
        const trx = await knex.transaction();
        const existeItem = String(await trx('itens').where('item_nome', item.item_nome).select('*')) ? true : false;
        let msg;
        if (!existeItem) {
            await trx('itens').insert(item);
            msg = 'Inserido com sucesso.';
        } else {
            msg = 'Item já existe.'
        }

        await trx.commit();
        return response.json(msg);


    }

    async delete(request: Request, response: Response) {
        const { item_codigo } = request.body;
        
        const trx = await knex.transaction();
        const existeItem = String(await trx('itens').where('item_codigo', item_codigo).select('*')) ? true : false;
        const existeFornAssociado = String(await trx('itens')
            .innerJoin('fornecedores_itens', 'for_item_codigoItem', 'item_codigo')
            .where('item_codigo', item_codigo)
            .select('*')) ? true : false;

        let msg;
        if (existeItem) {
            if (!existeFornAssociado) {
                await trx('itens').where('item_codigo', item_codigo).del('*');
                msg = 'Excluído com sucesso';
            } else {
                msg = 'Existem fornecedores associados à esse item';
            }

        } else {
            msg = 'Item não localizado';
        }
        await trx.commit();
        return response.json(msg);
    }



}
export default ItensController;