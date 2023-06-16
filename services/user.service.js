const UserRepository = require("../database/repository/user");
const { ValidatePassword, GenerateSignature, FormateData, GenerateSalt, GeneratePassword } = require("../utils");

// All Business logic will be here
class UserService {

    constructor(){
        this.repository = new UserRepository();
    }

    async SignIn(userInputs){

        const { username, password } = userInputs;
        
        const existingCustomer = await this.repository.FindCustomer({ username});

        if(existingCustomer){
            
            const validPassword = await ValidatePassword(password, existingCustomer.password, existingCustomer.salt);
            if(validPassword){
                const token = await GenerateSignature({ username: existingCustomer.username,role:existingCustomer.role, _id: existingCustomer._id});
                return FormateData({id: existingCustomer._id, token });
            }
        }

        return FormateData(null);
    }

    async SignUp(userInputs){
        
        const { username, password, role } = userInputs;
        
        // create salt
        let salt = await GenerateSalt();
        
        let userPassword = await GeneratePassword(password, salt);
        
        const existingCustomer = await this.repository.CreateUser({ username, password: userPassword, role, salt});
        
        const token = await GenerateSignature({ username: username, role:role, _id: existingCustomer._id});
        return FormateData({id: existingCustomer._id, token });

    }

}

module.exports = UserService;
