// import db
const sequelize = require("sequelize");
const Op = sequelize.Op;
const db = require('../models');
const User = db.user;
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const bcrypt = require('bcrypt');
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;
const multer = require('multer');
const getuser = async (req, res) => {
    try {
        const get = await User.findAll();
        return res.status(201).json(get);
    } catch (error) {
        console.log(error)
    }
}
const updatePassword = async (req,res)=>{
    try {
        const {id,password,newpass} = req.body;
        const existUser = await User.findByPk(id)
        if (existUser){
            const isMatch = await bcrypt.compare(password, existUser.password)
            if (!isMatch) {
                return res.status(201).json({ message: "Không thành công" })
            }
            else{
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(newpass, salt);
                await existUser.update({password:hashedPassword})
                return res.status(200).json({ message: "Thành công" })
            }
        }
    } catch (error) {
        console.log(error)
    }
}
const findUser = async(req,res) => {
    try {
        const {username} = req.body;
        const userNeeded = await User.findAll({attributes: ['id'],where : {
            username : {[Op.like]:`%${username}%`}
        }})
        if (userNeeded) {
            
            return res.status(200).json(userNeeded)
        }
        else
        {
            return res.status(404).json({ message: "Không tìm thấy" });
        }
    } catch (error) {
        console.log(error)
    }
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}_${file.originalname}`);
    }
  });
  
  const upload = multer({
    storage: storage,
    limits: {
      fileSize: 100 * 1024 * 1024 // giới hạn dung lượng file 100MB
    },
  });
  
const register = async (req, res) => {
    try {
        upload.array('avatar', 10)(req, res, async function (err) {
            const { username, email, password, address, phone } = req.body;
            if (err instanceof multer.MulterError) {
                return res.status(400).json({ message: err.message });
            } else if (err) {
                return res.status(400).json({ message: err.message });
            }

            // Nếu không có file ảnh được chọn
            if (!req.files || req.files.length === 0 || !username || !email || !password || !address || !phone ) {
                return res.status(202).json({ message: 'Vui lòng điền đầy đủ thông tin' });
            }
            const imgs = [];
            const existingUser = await User.findOne({
                where: {
                    email
                }
            });
            if (existingUser) {
                return res.status(200).json(
                    {message:'Email đã tồn tại trong hệ thống'}
                );
            }
            // Mã hóa mật khẩu
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            for (let i = 0; i < req.files.length; i++) {
                const imagePath = req.files[i].path;
                const imageUrl = `${req.protocol}://${req.get('host')}/${req.files[i].filename}`;
                const img = await User.create({
                    username: username, email: email, password: hashedPassword, address: address, phone: phone, notification_status: true,
                    avatar: imageUrl, isactive: true
                });
                imgs.push(img);
            }

            return res.status(200).json({ message: "Đăng kí thành công", imgs });
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Lỗi server' });
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
    login,
    findUser,
    updatePassword
}