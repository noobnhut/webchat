// import db
const db = require('../models');
const User = db.user;
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const bcrypt = require('bcrypt');
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;
const getuser = async (req, res) => {
    try {
        const get = await User.findAll();
        return res.status(201).json(get);
    } catch (error) {
        console.log(error)
    }
}

const register = async (req, res) => {
    try {
        const { username, email, password, address, phone } = req.body;
        const existUser = await User.findOne({ where: { email: email } });
        if (!existUser) {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt)

            const user = await User.create(
                {
                    username: username,
                    password: hash,
                    email: email,
                    address: address,
                    phone: phone,
                    isactive: true
                }
            )
            return res.status(200).json({ message: "Đăng ký thành công" })
        } else {
            return res.status(400).json({ message: "Tài khoản email đã tồn tại" })

        }
    } catch (error) {
        console.log(error)
    }
}
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const existUser = await User.findOne({ where: { email: email } });
        if (existUser) {
            const isMatch = await bcrypt.compare(password, existUser.password)
            if (!isMatch) {
                return res.status(201).json({ message: "Mật khẩu sai" })
            }
            // Tạo JWT
            const token = jwt.sign({
                userId: existUser.id
            }, JWT_SECRET, {
                expiresIn: JWT_EXPIRES_IN
            });
            return res.status(200).json(
                {
                    id: existUser.id,
                    username: existUser.username,
                    email: existUser.email,
                    address: existUser.address,
                    phone: existUser.phone, token
                })
        }
        else {
            return res.status(400).json({ message: "Tài khoản email không tồn tại" })

        }
    } catch (error) {
        console.log(error)

    }
}
module.exports = {
    getuser,
    register,
    login
}