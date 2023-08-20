const BlogPost = require('../models/BlogPost.js');

module.exports = async (req, res) => {
    try {
        const blogpost = await BlogPost.findById(req.params.id).populate('userid');

        if (!blogpost) {
            // Handle the case where the blog post with the given ID is not found
            return res.status(404).send('Blog post not found');
        }

        console.log(blogpost);
        res.render('post', {
            blogpost
        });
    } catch (error) {
        console.error(error);
        // Handle the error as needed, e.g., redirect to an error page
        res.status(500).send('Internal Server Error');
    }
};
