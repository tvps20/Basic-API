"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = require("./app");
var PORT = process.env.PORT || 3000;
app_1.default.app.listen(PORT, function (err) {
    if (err) {
        return console.log(err);
    }
    return console.log("Serve is listening on " + PORT); 
});
// Fechar a conexão com o banco caso o a excução pare.
process.once('SIGUSR2', function () { return app_1.default.closeDataBaseConnection('Nodemon restart', function () { return process.kill(process.pid, 'SIGUSR2'); }); });
process.on('SIGINT', function () { return app_1.default.closeDataBaseConnection('Execução interrompida', function () { return process.exit(0); }); });
