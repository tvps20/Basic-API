import * as mongoose from 'mongoose'

class DataBase {
    private DB_URI = 'mongodb://127.0.0.1/ts-lego-api';
    private DB_CONNECTION;

    constructor() {}

    createConnection() {
        
        if(process.env.NODE_ENV == 'production') {
            mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
            this.logger(process.env.MONGODB_URI);
        } else {
            mongoose.connect(this.DB_URI, { useNewUrlParser: true });
            this.logger(this.DB_URI);
        }     
    }

    logger(uri) {
        this.DB_CONNECTION = mongoose.connection;
        this.DB_CONNECTION.on('connected', () => console.log(`Mondoose esta conectado ao ${ uri }`));
        this.DB_CONNECTION.on('error', error => console.log(`Erro na conexão: ${ error }`));
        this.DB_CONNECTION.on('disconnected', () => console.log(`Mongoose esta desconectado do ${ uri }`));
    }

    closeConnection(message, callback){
        this.DB_CONNECTION.close(() => {
            console.log(`Mongoose foi desconectado pelo: ${ message }`);
            callback();
        })
    }
}

export default DataBase;