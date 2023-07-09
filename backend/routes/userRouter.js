const express =require("express") ;
const {
    getuser,
    register,
    login,
    findUser,
    updatePassword
} =require("../Controller/usercontroller") ;
const routerUser = express.Router();
routerUser.get('/api/user/get', getuser);
routerUser.post('/api/user/register',register);
routerUser.post('/api/user/login',login);
routerUser.post('/api/user/findUser',findUser);
routerUser.put('/api/user/updatePassword',updatePassword);

module.exports = { 
    routerUser,
};
