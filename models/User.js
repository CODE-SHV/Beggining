const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt')
const {hash} = require("bcrypt");
const uniqueValidator = require('mongoose-unique-validator')

const UserSchema = new Schema({
    username: {type: String, required:[true, "Please provide username"],unique: true},
    password: {type: String, required: [true, "Please provide password"]}
});

UserSchema.plugin(uniqueValidator)

// This block enables that when saving the password it hashes so you cannot se the actual password
UserSchema.pre('save', function (next)
{
    const user = this

    bcrypt.hash(user.password, 10, (error, hash)=>{
        user.password = hash
        next()
    })
})

// export model
const User = mongoose.model('User',UserSchema);
module.exports = User;