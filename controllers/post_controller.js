const Comment = require('../models/comment');
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

module.exports.destroy = (req, res) => {
    Post.findById(req.params.id, (err, post) => {
        if (post.user == req.user.id) {
            post.remove();
            Comment.deleteMany({ post: req.params.id }, (err) => {
                return res.redirect('back')
            })
        } else {
            return res.redirect('back')
        }
    })
}