const jwt = require('jsonwebtoken');


// trên header của chúng ta sẽ có dạng: 
// Authorization: Bearner <token ở vị trí này>
const verifyToken = (req, res, next) => {
    const authHeader = req.header('Authorization')
    const token = authHeader && authHeader.split(' ')[1] 
    if(!token) 
        return res.status(401).json({success: false, message: 'Token not found'})
    
    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        console.log(decoded)
        req.userId = decoded.userId
        next()
    } catch (error) {
        console.log(error)
        return res.status(403).json({success: false, message:'invalid token'})
    }
}

module.exports = verifyToken