const {User} = require('../models/User');
const jwt = require('jsonwebtoken');
module.exports = async function(req, res , next){
    let token = req.cookies.auth;
    if(!token) return res.status(401).json({err: 'No token provided.'});
    let verified = jwt.verify(token, process.env.JWT_SECRET);
    if(!verified) return res.status(401).json({err: 'Invalid token.'});
    req.user = await User.findById(verified.id);
    return next();

}