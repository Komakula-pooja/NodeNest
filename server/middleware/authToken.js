const { verifyToken } = require('../service/userService');
const mongoose = require("mongoose");

const authToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    //console.log("Authorization Header:", authHeader);
    if (!authHeader) {
        return res.status(401).send({error: 'Unauthorized'});
    }

    const token = authHeader && authHeader.split(' ')[1];
    //console.log("Extracted Token:", token);
    if (!token) {
        return res.status(401).send({error: 'No token Provided'});
    }

    try {
        const decoded = verifyToken(token);
        //console.log('decoded', decoded);
        if (!decoded.id || !mongoose.Types.ObjectId.isValid(decoded.id)) {
            return res.status(400).json({ error: "Invalid user ID in token" });
        }
      
        req.user = decoded.id;
        next();
    } catch (error) {
        console.error('Error verifying token:', error);
        return res.status(403).send({error: 'Invalid token'});
    }
}

module.exports = authToken;