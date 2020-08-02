import express from 'express';
import FornecedoresController from './database/controller/FornecedoresController';
import ItensController from './database/controller/ItensController';
import UsuariosController from './database/controller/UsuariosController';
import Fornecedores_ItensController from './database/controller/Fornecedores_ItensController';

const routes = express.Router();

const fornecedoresController = new FornecedoresController();
const itensController = new ItensController();
const usuariosController = new UsuariosController();
const fornecedores_ItensController = new Fornecedores_ItensController();

routes.get('/fornecedores', fornecedoresController.show);
routes.post('/fornecedores', fornecedoresController.create);
routes.delete('/fornecedores', fornecedoresController.delete);

routes.get('/itens', itensController.show);
routes.post('/itens', itensController.create);
routes.delete('/itens', itensController.delete);

routes.get('/usuarios', usuariosController.show);
routes.post('/usuarios', usuariosController.create);
routes.delete('/usuarios', usuariosController.delete);

routes.get('/for-itens', fornecedores_ItensController.index);
routes.post('/for-itens', fornecedores_ItensController.create);
routes.delete('/for-itens', fornecedores_ItensController.delete);

 
export default routes;