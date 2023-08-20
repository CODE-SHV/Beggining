// Here are the requires I'll be using
const express = require('express') // requires the express module
const app = express()
const ejs = require('ejs');
const  flash = require('connect-flash')
// MongoDB connection
const mongoose = require('mongoose');

// Session timer middleware
const expressSession =require('express-session')

// MongoDB connection
mongoose.set('strictQuery', true);
mongoose.connect("mongodb+srv://lopez87:CrY9T043vR@testwebapp.vuouoqw.mongodb.net/",{useNewUrlParser: true, useUnifiedTopology:true})

const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
app.set('view engine', 'ejs')

// This is ussed to hide new or login tabs
global.loggedIn = null;

//Controllers

//Middlewares
const validateMiddleWare = require('./middleware/validationMiddleware')
const authMiddleware = require('./middleware/authMiddleware')
const redirectIfAuthenticatedMiddleware = require('./middleware/redirectIfAuthenticatedMiddleware')

// Controllers
const homeController = require('./controllers/home')
const storePostController = require('./controllers/storePost')
const getPostController = require('./controllers/getPost')
const newPostController = require("./controllers/newPost")
const newUserController = require('./controllers/newUser')
const storeUserController = require('./controllers/storeUser')
const loginController = require("./controllers/login")
const loginUserController = require("./controllers/loginUser")
const logoutController = require("./controllers/logout")

const {status} = require("express/lib/response");

// Functions I'll be using from Express.js
app.use(bodyParser.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))
app.use(fileUpload())
app.use(flash())
app.use(expressSession({
    secret: 'keyboard cat'
}))

app.use("*", (req, res, next) => {
    loggedIn = req.session.userId;
    next()
});

// Using the middle ware in the posts/new
app.use('/posts/store', validateMiddleWare)

let port = process.env.PORT;
if (port == null || port == "") {
    port = 4000;
}
app.listen(port, ()=>{
    console.log('App listening...')
})

// Home
app.get('/',homeController)

// Post ID profile
app.get('/post/:id',getPostController)

app.post('/posts/store', authMiddleware, storePostController)

// Posts - adding the authMiddleware to see if the user is logged in so it can post
app.get('/posts/new', authMiddleware, newPostController)

// Displays the user registration page
app.get('/auth/register', redirectIfAuthenticatedMiddleware, newUserController)

// Where to store the users
app.post('/users/register', redirectIfAuthenticatedMiddleware, storeUserController)

// Login page
app.get('/auth/login',redirectIfAuthenticatedMiddleware, loginController)

// Post the user credentials so it can verify if the user exists
app.post('/users/login',redirectIfAuthenticatedMiddleware, loginUserController)

// Logout route
app.get("/auth/logout", logoutController)

// The 404 page
app.use((req, res) =>res.render('notfound'));