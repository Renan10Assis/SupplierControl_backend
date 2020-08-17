import knex from '../connection';
import { Request, Response } from 'express';

class UsuariosController {
    async show(request: Request, response: Response) {
        
        const trx = await knex.transaction();
        
        const usuarios = await trx('usuarios').select('*');

        await trx.commit();
        return response.json(usuarios);


    }
    async create(request: Request, response: Response) {
        const {
            usu_login,
            usu_senha
        } = request.body;

        const user = {
            usu_login,
            usu_senha
        };

        const trx = await knex.transaction();
        let msg;

        const existe_user = String(await trx('usuarios').where('usu_login', usu_login).select('*')) ? true : false;

        if (!existe_user) {
            await trx('usuarios').insert(user);
            msg = 'Usuário cadastrado com sucesso.';
        } else {
            msg = 'Usuário já existe.';
        }
        await trx.commit();
        return response.json(msg);


    }

    async delete(request: Request, response:Response){
        const {usu_id} = request.body;
        const trx = await knex.transaction();
        const existeId = String(await trx('usuarios').where('usu_id', usu_id).select('*')) ? true: false;
        let msg;
        if(existeId){
            await trx('usuarios').where('usu_id', usu_id).del('*');
            msg = 'Excluído com sucesso';
        }else{
            msg = 'Id não localizado';
        }
        await trx.commit();
        return response.json(msg);
    }
    async autenticarUser(request: Request, response:Response){
        const {
            usu_login,
            usu_senha
        } = request.body;
        const trx = await knex.transaction();
        const existeId = String(await trx('usuarios')
        .where('usu_login', usu_login)
        .where('usu_senha', usu_senha)
        .select('*')) ? true: false;
        

        await trx.commit();
        return response.json(existeId);
    }

}

export default UsuariosController;