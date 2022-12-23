const Post = require('../models/post');

module.exports.create = (req, res) => {
    Post.create({
        title: req.body.title,
        subtitle: req.body.subtitle,
        content: req.body.content,
        user: req.user._id
    }, (err, post) => {
        console.log(post)
        if (err) return console.log("err in creating post");
        return res.redirect("back");
    })
}