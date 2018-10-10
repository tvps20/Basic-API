import express = require('express');
import * as morgan from 'morgan';
import * as bodyParser from 'body-parser';
import DataBase from './config/db';
import UserController from './modules/user/controller';
import ROUTES from '../routes/routes'

class App {
  
    public app: express.Application;
    private morgan: morgan.Morgan;
    private bodyparser;

    constructor() {
        this.app = express(), this.middleware(), this.routes();
    }

    public closeDataBaseConnection(message, callback){
        DataBase.closeConnection(message, () => callback());
    }

    public middleware()  {
        this.app.use(morgan('dev'));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
    }

    public routes() {
        ROUTES(this.app);
    }   
}

export default new App();