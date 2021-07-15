const mongoose = require('mongoose');

const dbConnect = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_CONN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        console.log('Base de datos ONLINE');
    } catch (error) {
        console.log(error);
        throw new Error('Error al conectarse a la base de datos.');
    }
};

module.exports = { dbConnect };