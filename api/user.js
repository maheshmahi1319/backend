const  UserAuth = require('./middlewares/auth');
const UserService = require('../services/user.service');


module.exports = (app) => {
    
    const service = new UserService();

    app.post('/signup', async (req,res,next) => {
        const { username, password, role } = req.body;
        const { data } = await service.SignUp({ username, password, role}); 
        res.json(data);

    });

    app.post('/login',  async (req,res,next) => {
        
        const { username, password } = req.body;
        const { data } = await service.SignIn({ username, password});
        console.log(data);

        res.json(data);

    });
}
