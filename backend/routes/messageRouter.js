const express =require("express") ;
const {
    getmessbyid
} =require("../Controller/messagecontroller") ;
const routerMessage = express.Router();
routerMessage.post('/api/message/getbyid', getmessbyid);


module.exports = { 
    routerMessage,
};
