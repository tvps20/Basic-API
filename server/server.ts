import App from './app';

const port = process.env.PORT || 3000

App.app.listen(port, (err) => {
    if(err){
        return console.log(err);
    }

    return console.log(`Serve is listening on ${port}`)
});

// Fechar a conexão com o banco caso o a excução pare.
process.once('SIGUSR2', () => App.closeDataBaseConnection('Nodemon restart', () => process.kill(process.pid, 'SIGUSR2')));
process.on('SIGINT', () => App.closeDataBaseConnection('Execução interrompida', () => process.exit(0)));