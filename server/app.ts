import express = require('express');
import * as morgan from 'morgan';
import * as bodyParser from 'body-parser';
import DataBase from './config/db';
import UserRoutes from './modules/user/routes';

class App {
  
    public app: express.Application;
    private morgan: morgan.Morgan;
    private bodyparser;
    private database: DataBase;

    constructor() {
        this.app = express(), this.middleware(), this.routes();
        this.database = new DataBase();  
        this.dataBaseConnection(); 
    }

    public dataBaseConnection(){
        this.database.createConnection();
    }

    public closeDataBaseConnection(message, callback){
        this.database.closeConnection(message, () => callback());
    }

    public middleware(): any {
        this.app.use(morgan('dev'));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
    }

    public routes(): any {
       this.app.route('/').get((req, res) => res.status(200).json({'message': 'Hello, world'}));
       this.app.route('/teste').get((req, res) => res.status(200).json({'message': 'Rota teste esta funcionando'}));
       this.app.route('/api/v1/users').get(UserRoutes.getAll);
       this.app.route('/api/v1/users/:id').get(UserRoutes.getById);
       this.app.route('/api/v1/users').post(UserRoutes.create);
       this.app.route('/api/v1/users/:id').put(UserRoutes.update);
       this.app.route('/api/v1/users/:id').delete(UserRoutes.delete);

    }   
}

export default new App();