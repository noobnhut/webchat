const express =require("express") ;
const {
    getmessbyid,
    createChat
} =require("../Controller/messagecontroller") ;
const routerMessage = express.Router();
routerMessage.post('/api/message/getbyid', getmessbyid);
routerMessage.post('/api/message/create',  createChat);
module.exports = { 
    routerMessage,
};
