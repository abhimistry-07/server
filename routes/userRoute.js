const express = require('express');
const UserModel = require('../models/userModel');
const userRouter = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

userRouter.post('/register', async (req, res) => {
    const { email, pass, name } = req.body;
    try {
        const newPass = await bcrypt.hash(pass, 5);
        const user = await UserModel.create({ ...req.body, pass: newPass });
        res.status(200).send({ 'msg': 'New user has been registered.', user })
    } catch (error) {
        res.status(200).send({ msg: "Something went wrong", error });
    }
})

userRouter.post('/login', async (req, res) => {

    const { email, pass } = req.body;

    try {

        const user = await UserModel.findOne({ email });

        const verify = await bcrypt.compare(pass, user?.pass);

        if (user && verify) {
            const token = jwt.sign({ userId: user._id, name: user.name }, "secretPass")
            return res.send({ 'msg': 'Logged in', token })
        } else {
            return res.status(404).send({ "msg": "User not found, wrong credentials" })
        }

    } catch (error) {
        res.status(200).send({ msg: "Something went wrong", error: error.message });
    }
})

module.exports = userRouter;