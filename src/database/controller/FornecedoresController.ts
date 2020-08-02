import knex from '../connection';
import { Request, Response } from 'express';
import ValidarEmail from '../../util/ValidarEmail';
import ValidarCNPJ from '../../util/ValidarCNPJ';

class FornecedoresController {

    async show(request: Request, response: Response) {
        const fornecedores = await knex('fornecedores').select('*');

        //serializedFornecedores...

        return response.json(fornecedores);
    }

    async create(request: Request, response: Response) {
        const {
            for_cnpj,
            for_razaoSoc,
            for_telefone,
            for_celular,
            for_email,
            for_endereco

        } = request.body;

        const fornecedor = {
            for_cnpj,
            for_razaoSoc,
            for_telefone,
            for_celular,
            for_email,
            for_endereco

        }
        const validarCNPJ = new ValidarCNPJ();
        const validarEmail = new ValidarEmail();

        const trx = await knex.transaction();
        let msg;
        const cnpjvalido = validarCNPJ.validarcnpj(for_cnpj);
        const emailvalido = validarEmail.validaremail(for_email);

        console.log(cnpjvalido,emailvalido);
        if ( cnpjvalido && emailvalido) {

            const existefor = String(await trx('Fornecedores').where('for_cnpj', for_cnpj).select('*')) ? true : false;

            console.log(existefor);
            if (!existefor) {
                await trx('Fornecedores').insert(fornecedor);
                msg = 'Cadastrado com sucesso.';
            } else {
                msg = 'Já existe fornecedor com este cnpj';
                
            }
            await trx.commit();
        } else {
            msg = 'Dados inválidos';

        }
        return response.json(msg);


    }

    async delete(request: Request, response: Response) {
        const { for_codigo } = request.body;
        
        const trx = await knex.transaction();
        const existeFor = String(await trx('fornecedores').where('for_codigo', for_codigo).select('*')) ? true : false;
        const existeItemAssociado = String(await trx('fornecedores')
            .innerJoin('fornecedores_itens', 'for_item_codigoForn', 'for_codigo')
            .where('for_codigo', for_codigo)
            .select('*')) ? true : false;

        let msg;
        if (existeFor) {
            if (!existeItemAssociado) {
                await trx('fornecedores').where('for_codigo', for_codigo).del('*');
                msg = 'Excluído com sucesso';
            } else {
                msg = 'Existem itens associados à esse fornecedor';
            }

        } else {
            msg = 'Fornecedor não localizado';
        }
        await trx.commit();
        return response.json(msg);
    }





}
export default FornecedoresController;