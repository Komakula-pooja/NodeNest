const userService = require('../service/userService');

const getUser = async (req,res) =>{
    try{
      const { username, email } = req.query; 
        if (!username && !email) {
            const error = new Error('Please provide either username or email');
            error.statusCode = 400;
            throw error;
        }

        const user = await userService.getUser(username, email);
        if (!user) {
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({ user });
    } catch (error) {
        console.log(error);
        res.status(error.statusCode || 500).json({ error: error.message });
    } 
}

const signupUser = async (req, res)=> {
    try{
        const result = await userService.signupUser(req.body);
        res.status(201).json(result);
    } catch (e) {
        console.log(e);
        res.status(e.statusCode || 500).json({ error: e.message });
    }
}

const loginUser = async (req, res) => {
    try {
      const result = await userService.loginUser(req.body);
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      res.status(error.statusCode || 500).json({ error: error.message });
    }
  };
  
  module.exports = { signupUser, loginUser, getUser };