module.exports = (req,res)=>{
    if(req.session.userId)
    {
         return res.render('create', {createPost: true})

    }

    // If you re not logged in then it will redirect you to the login page
    res.redirect('/auth/login')

}