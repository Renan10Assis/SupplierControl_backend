import express from 'express';


const routes = express.Router();


const itens = [
    'Item1',
    'Item2',
    'Item3',
    'Item4',

]

routes.get('/itens',(request, response)=>{
    response.json(itens);
 });
 
 
 export default routes;