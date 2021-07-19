const express = require('express');
const cors = require('cors');
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
        this.app.use(cors());
        this.app.use(express.json());
    }

    routes() {
        this.app.use('/api/users', require('../routes/user.routes'));
        this.app.use('/api/auth', require('../routes/auth.routes'));
    }

    run() {
        this.app.listen(this.port, () => {
            console.log('Escuchando desde el puerto', this.port);
        });
    }
}

module.exports = Server;