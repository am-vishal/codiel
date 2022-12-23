const Post = require('../models/post');

module.exports.create = (req, res) => {
    Post.create({
        content: req.body.content,
        user: req.user._id
    }, (err, post) => {
        console.log(post)
        if (err) return console.log("err in creating post");
        return res.redirect("back");
    })
}