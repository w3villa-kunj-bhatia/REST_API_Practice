const User = require('../models/user');

async function name(req, res) {
    const users = await User.find({});
    res.setHeader("X-MyName", "Kunj");
    return res.status(200).json(users);
}

module.exports = {
    
};