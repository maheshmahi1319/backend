const mongoose = require('mongoose');
const { UserModel } = require('../models');

//Dealing with data base operations
class UserRepository {

    async CreateUser({ username, password, role, salt }){

        const user = new UserModel({
            username,
            password,
            salt,
            role
        })

        const userResult = await user.save();
        return userResult;
    }

    async FindCustomer({ username }){
        const existingCustomer = await UserModel.findOne({ username: username });
        return existingCustomer;
    }
}

module.exports = UserRepository;
