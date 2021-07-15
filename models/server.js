const express = require('express');
const { dbConnect } = require('../database/config');
class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.connect();
        this.middleware();
        this.routes();
    }

    async connect() {
        await dbConnect();
    }

    middleware() {
        this.app.use(express.static('public'));
        this.app.use(express.json());
    }

    routes() {
        this.app.use('/api/users', require('../routes/user.routes'));
    }

    run() {
        this.app.listen(this.port, () => {
            console.log('Escuchando desde el puerto', this.port);
        });
    }
}

module.exports = Server;