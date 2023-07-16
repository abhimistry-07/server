const express = require('express');
const app = express();
const port = process.env.port;
const connection = require('./db');
const userRouter = require('./routes/userRoute');
const bcrypt = require('bcrypt');
const noteRouter = require('./routes/notesRoute');
const authenticate = require('./middlewares/auth');
const cors = require('cors');
require("dotenv").config();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Home Page');
})

app.use('/users', userRouter);
app.use('/notes', authenticate, noteRouter);

app.listen(port, async () => {
    try {
        await connection;
        console.log('Connected to DB');
    } catch (error) {
        console.log(error);
    }
    console.log(`Listening on port ${port}`);
});