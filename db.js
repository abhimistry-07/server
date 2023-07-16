const mongoose = require('mongoose');
require("dotenv").config();
 
// mongodb+srv://abhi:abhi@cluster0.mjba364.mongodb.net/notecrud?retryWrites=true&w=majority

const connection = mongoose.connect(process.env.mongoURL);

// (`mongodb://127.0.0.1:27017/notespsc`);

module.exports = connection;