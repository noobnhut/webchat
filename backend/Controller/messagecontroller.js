const db = require("../models");
const User = db.user;
const Message = db.message;
const sequelize = require("sequelize");
const Op = sequelize.Op;

const getmessbyid = async (req, res) => {
  try {
    const { send, reply } = req.body;
    const data = await Message.findAll({
      where: {
        [Op.or]: [
          { user_send: send, user_receive: reply },
          { user_send: reply, user_receive: send },
        ],
      },
      order: [["id", "ASC"]], // Order by id in ascending order
    });

    return res.json(data);
  } catch (error) {
    console.log(error);
  }
};
const createChat = async (req, res) => {
  try {
    const { send, reply, message_content } = req.body;
    const chat = await Message.create({
      user_receive: reply,
      user_send: send,
      message_content: message_content,
      status_seen: false,
      status_message: false,
      reply_mess: null,
    });
    res.status(200).json(chat.id);
    res.io.emit("chat", chat);
  } catch (error) {
    console.log(error);
  }
};

const deleteHistory = async (req, res) => {
  try {
    const { send, receive } = req.body;
    // const exitst = await Message.findAll({
    //   where: {
    //     [Op.or]: [
    //       { user_send: send, user_receive: receive },
    //       { user_send: receive, user_receive: send },
    //     ],
    //   },
    //   order: [["id", "ASC"]],
    // });

    // exitst.forEach(async (message) => {
    //   if (message.user_send === send || message.user_receive === send) {
    //     if (message.deleted == null) {
    //       await message.update({ deleted: send });
    //     }
    //     if(message.deleted == receive)
    //     {
    //         await message.destroy()
    //     }
    //   }
    // });

    res.json({send,receive});
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  getmessbyid,
  createChat,
  deleteHistory
};
