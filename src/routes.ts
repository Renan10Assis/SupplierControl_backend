import express from 'express';
import FornecedoresController from './database/controller/FornecedoresController';
import ItensController from './database/controller/ItensController';
import UsuariosController from './database/controller/UsuariosController';

const routes = express.Router();

const fornecedoresController = new FornecedoresController();
const itensController = new ItensController();
const usuariosController = new UsuariosController;

routes.get('/fornecedores', fornecedoresController.show);
routes.post('/fornecedores', fornecedoresController.create);

routes.get('/itens', itensController.show);
routes.post('/itens', itensController.create);

routes.get('/usuarios', usuariosController.show);
routes.post('/usuarios', usuariosController.create);

 
export default routes;