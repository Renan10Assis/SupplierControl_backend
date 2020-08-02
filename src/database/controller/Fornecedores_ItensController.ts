import knex from '../connection';
import { Request, Response } from 'express';

class Fornecedores_ItensController {
    async index(request: Request, response: Response) {
        const {
            item_codigo
        } = request.body;

        const trx = await knex.transaction();

        const fornecedores = await trx('fornecedores')
            .innerJoin('fornecedores_itens', 'for_item_codigoForn', 'for_codigo')
            .innerJoin('itens', 'item_codigo', 'for_item_codigoItem')
            .where('for_item_codigoItem', item_codigo)
            .select('*')
            .orderBy('for_razaoSoc');

        await trx.commit();

        return response.json(fornecedores);

    }

    async create(request: Request, response: Response) {
        const {
            item_codigo,
            for_codigo
        } = request.body;

        const for_item = {
            for_item_codigoItem: item_codigo,
            for_item_codigoForn: for_codigo
        }
        const trx = await knex.transaction();

        const existeItem = String(await trx('itens').where('item_codigo', item_codigo).select('*')) ? true : false;
        const existeForn = String(await trx('fornecedores').where('for_codigo', for_codigo).select('*')) ? true : false;
        const existeAssociacao = String(await trx('fornecedores')
            .innerJoin('fornecedores_itens', 'for_item_codigoForn', 'for_codigo')
            .where('for_codigo', for_codigo).select('*')) ? true : false;


        let msg;
        if (existeItem && existeForn) {
            if (!existeAssociacao) {
                await trx('fornecedores_itens').insert(for_item);
                msg = 'Fornecedor associado ao item com sucesso';
            } else {
                msg = 'Associação já existe.';

            }
        } else {
            msg = 'Erro: Id inválido';

        }
        await trx.commit();

        return response.json(msg);


    }


    async delete(request: Request, response: Response) {
        const {
            item_codigo,
            for_codigo
        } = request.body

        const trx = await knex.transaction();
        let msg;
        const existeFor = String(await trx('fornecedores_itens')
            .innerJoin('itens', 'item_codigo', 'for_item_codigoItem')
            .where('for_item_codigoForn', for_codigo).select('*')) ? true : false;


        if (existeFor) {
            await trx('fornecedores_itens')
                .innerJoin('itens', 'item_codigo', 'for_item_codigoItem')
                .where('for_item_codigoForn', for_codigo).del('*');
            msg = 'Fornecedor removido do item com sucesso.';
        } else {
            msg = 'Erro ao remover relação de fornecedor e item.';
        }
        await trx.commit();

        return response.json(msg);

    }
}

export default Fornecedores_ItensController;