const express =require("express") ;
const {
    getuser,
    register,
    login
} =require("../Controller/usercontroller") ;
const routerUser = express.Router();
routerUser.get('/api/user/get', getuser);
routerUser.post('/api/user/register',register);
routerUser.post('/api/user/login',login);

module.exports = { 
    routerUser,
};
