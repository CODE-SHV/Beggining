module.exports = (req, res) =>{
    req.session.destroy(() =>{
        res.redirect('/')
        console.log("You have been logged out of the account")
    })
}