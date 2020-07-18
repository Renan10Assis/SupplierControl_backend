import knex from '../connection';
import {Request, Response} from 'express';

class UsuariosController{
    async show(request : Request, response: Response){
        const usuarios = await knex('usuarios').select('*');


        return response.json(usuarios);


    }
    async create(request : Request, response: Response){
        const userData ={
            usu_login: request.body.usu_login,
            usu_senha: request.body.usu_senha
        };

        const insertedUser = userData.usu_login && userData.usu_senha ? await knex('usuarios').insert(userData): false;

        const msg = insertedUser ? 'Usuário cadastrado com sucesso' : 'Erro ao cadastrar usuário';

        return response.json(msg);


    }

}

export default UsuariosController;