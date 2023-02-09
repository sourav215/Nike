const jwt = require('jsonwebtoken');
const config = require('../config/config')

const authentication = (req, res, next) => {
    if(!req.headers.authorization){
        return res.send("Please login again")
    }
    const user_token = req.headers.authorization.split(" ")[1]
    jwt.verify(user_token, config.JWT_SECRET_KEY, function(err, decoded) {
        if(err){
            return res.send("Please login again")
        }
        // console.log(decoded)
        req.body.email = decoded.email
        req.body.userId = decoded.userId
        next()
    });
}

module.exports = authentication