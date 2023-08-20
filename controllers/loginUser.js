const bcrypt = require('bcrypt');
const User = require('../models/User');

module.exports = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username: username });

        if (user) {
            const same = await bcrypt.compare(password, user.password);

            if (same) {
                req.session.userId = user._id;
                res.redirect('/');
                console.log("The login is successful - ", username)
            } else {
                res.redirect('/auth/login');
                console.log("Please enter the correct Username/Password combination")

            }
        } else {
            console.log("/auth/login::", user);
            res.redirect('/auth/login');
        }
    } catch (error) {
        console.error('Error:', error);
        res.redirect('/auth/login');

        console.log("Please enter the correct Username/Password combination")
    }
};
