const User = require('../models/userModel');
const { v4: uuidv4 } = require('uuid');

const checkIfUserExists = async (email, password = "") => {
    try {
        const user = await User.findOne({email});

        if(password === "") {
            return user !== null;
        }

        return user !== null && user.password === password;
    } catch(error) {
        console.log(error);
    }
}


module.exports = {
    get: async (req, res) => {
        const { email, password } = req.query;

        if (await checkIfUserExists(email, password)) {
            res.status(200).send("Login successful");
            return ; 
        }
        
        res.status(404).send("User with these credentials does not exist");
    },

    post: async (req, res) => {
        const { email } = req.body;
        if (await checkIfUserExists(email)) {
            res.status(400).send("User with this email already exists");
            return ;
        }

        const user = new User({...req.body});
        const { avatar } = req.body;
        avatar._id = uuidv4();
        user._id = uuidv4();
        user.avatar = avatar;
        user.save();

        res.status(201).send("User has been saved successfully");
    }
}