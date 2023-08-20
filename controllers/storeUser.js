const User = require('../models/User.js');
const path = require('path');
const { errorFunc } = require('express-fileupload/lib/utilities');

// Exports the req.body to the database so it can be saved
module.exports = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.redirect('/');
        console.log('User', user, 'has been created');
    } catch (error) {
        console.error(error);

        if (error.errors) {
            const validationErrors = Object.keys(error.errors).map((key) => error.errors[key].message);

            // Gets rid of the errors when refreshing page
            req.flash('validationErrors', validationErrors)

            // To keep the data keyed in, we also flash req.body which contains the data
            // keyed into the form. In controllers/storeUser.js, add the following line:
            req.flash('data', req.body)
        }

        return res.redirect('/auth/register');
    }
};
