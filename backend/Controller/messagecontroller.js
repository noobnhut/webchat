const db = require('../models');
const User = db.user;
const Message = db.message;
const sequelize = require('sequelize');
const Op = sequelize.Op;

const getmessbyid = async(req,res)=>
{
    try {
        const{send,reply}=req.body;
        const data = await Message.findAll({
            where: {
                [Op.or]: [
                    { user_send: send, user_reply: reply },
                    { user_send: reply, user_reply: send }
                ]
            }
            
          });
      
          return res.json(data);
    } catch (error) {
        console.log(error)
    }
}
module.exports = {
    getmessbyid
}