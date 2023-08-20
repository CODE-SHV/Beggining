const BlogPost = require('../models/BlogPost.js')
module.exports = async (req, res) => {
    const blogposts = await BlogPost.find({}).populate('userid');

    // To see what is in the session object
    console.log(req.session)
    res.render('index', {
        blogposts
    });
}