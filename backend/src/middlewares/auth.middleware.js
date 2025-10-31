const jwt = require('jsonwebtoken');
const db = require('../models');
require('dotenv').config();

const verifyToken = async (req, res, next) => {
    const tokenHeader = req.headers['authorization'];
    const token = tokenHeader && tokenHeader.split(' ')[1];

    if (!token) {
        return res
            .status(401)
            .json({ errCode: 1, errMessage: 'No token provided' });
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
            return res.status(403).json({
                errCode: 2,
                errMessage: 'Failed to authenticate token'
            });
        }

        try {
            const user = await db.User.findByPk(decoded.id);

            if (!user) {
                return res.status(404).json({
                    errCode: 3,
                    errMessage: 'User not found'
                });
            }

            req.user = decoded;
            next();
        } catch (err) {
            return res
                .status(500)
                .json({ errCode: -1, errMessage: 'Server error' });
        }
    });
};

module.exports = {
    verifyToken
};
