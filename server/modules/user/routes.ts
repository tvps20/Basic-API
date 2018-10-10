import UserController from './controller';
import * as httpStatus from 'http-status';

const sendResponse = function(res, statusCode, date ) {
    res.status(statusCode).json({ 'result': date })
}

class UserRoutes {

    constructor(app) {
        this.createRoutes(app);
    }

    public createRoutes(app): any {
        app.route('/').get((req, res) => res.status(200).json({'message': 'Hello, world'}));
        app.route('/teste').get((req, res) => res.status(200).json({'message': 'Rota teste esta funcionando'}));
        app.route('/api/v1/users').get(this.getAll);
        app.route('/api/v1/users/:id').get(this.getById);
        app.route('/api/v1/users').post(this.create);
        app.route('/api/v1/users/:id').put(this.update);
        app.route('/api/v1/users/:id').delete(this.delete);
 
     }  

    public getAll(req, res) {
        UserController.getAll()
            .then(users => sendResponse(res, httpStatus.OK, users))
            .catch(err => {
                console.error.bind(console, `Erro ao buscar usuários: ${ err.message }`);
                sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, `Erro ao buscar usuários: ${ err.message }`);
            });
    }

    public getById(req, res) {
        const id = { _id: req.params.id };

        if(id._id.length != 24 ) return sendResponse(res, httpStatus.BAD_REQUEST, 'ID inválido!');

        UserController.getById(id)
            .then(user => {
                user == null ? sendResponse(res, httpStatus.NOT_FOUND, 'Usuário não foi encontrado!') : sendResponse(res, httpStatus.OK, user);
            })
            .catch(err => {
                console.error.bind(console, `Erro ao buscar usuário: ${ err.message }`);
                sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, `Erro ao buscar usuário: ${ err.message }`);
            });
    }

    public create(req, res) {
        const user = req.body;
        UserController.create(user)
            .then(user => sendResponse(res, httpStatus.CREATED, 'Usuário criado com sucesso!'))
            .catch(err => {
                console.error.bind(console, `Erro ao criar usuário: ${ err.message }`);
                sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, `Erro ao criar usuário: ${ err.message }`);
            });
    }

    public update(req, res) {
        const id = { _id: req.params.id };
        const user = req.body;

        if(id._id.length != 24 ) return sendResponse(res, httpStatus.BAD_REQUEST, 'ID inválido!');

        UserController.update(id, user)
            .then(user => {
                user == null ? sendResponse(res, httpStatus.NOT_FOUND, 'Usuário não foi encontrado!') : sendResponse(res, httpStatus.OK, 'Usuário Atualizado');
            })
            .catch(err => {
                console.error.bind(console, `Erro ao atualizar usuário: ${ err.message }`);
                sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, `Erro ao atualizar usuário: ${ err.message }`);
            });
    }

    public delete(req, res) {
        const id = { _id: req.params.id };

        if(id._id.length != 24 ) return sendResponse(res, httpStatus.BAD_REQUEST, 'ID inválido!');

        UserController.delete(id)
            .then(result => sendResponse(res, httpStatus.OK, 'Usuário excluido com sucesso!'))
            .catch(err => {
                console.error.bind(console, `Erro ao excluir usuário: ${ err.message }`);
                sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, `Erro ao excluir usuário: ${ err.message }`);
            });
    }
}

export default UserRoutes;