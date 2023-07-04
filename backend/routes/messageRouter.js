const express =require("express") ;
const {
    getmessbyid,
    createChat,
   deleteHistory
} =require("../Controller/messagecontroller") ;
const routerMessage = express.Router();
routerMessage.post('/api/message/getbyid', getmessbyid);
routerMessage.post('/api/message/create',  createChat);
routerMessage.post('/api/message/delete',  deleteHistory);

module.exports = { 
    routerMessage,
};
