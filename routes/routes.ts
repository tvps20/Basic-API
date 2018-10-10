import UserController from '../server/modules/user/controller'


const ROUTES = function(app) {
    app.route('/').get((req, res) => res.status(200).json({'message': 'Hello, world'}));
    app.route('/teste').get((req, res) => res.status(200).json({'message': 'Rota teste esta funcionando'}));
    app.route('/api/v1/users').get(UserController.getAll);
    app.route('/api/v1/users/:id').get(UserController.getById);
    app.route('/api/v1/users').post(UserController.create);
    app.route('/api/v1/users/:id').patch(UserController.update); // Troando put por patch, atualização parcial, atualiza apenas o campo que foi modificado.
    app.route('/api/v1/users/:id').delete(UserController.delete);
}

export default ROUTES;