const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = async (req, res) => {
    try {
        await Post.create({
            content: req.body.content,
            user: req.user._id
        })
        return res.redirect("back");
    } catch (err) {
        console.log("err in creating post", err);
        return;
    }
}

module.exports.destroy = async (req, res) => {
    try {
        let post = await Post.findById(req.params.id)
        if (post.user == req.user.id) {
            post.remove();
            await Comment.deleteMany({ post: req.params.id })
            return res.redirect('back')
        } else {
            return res.redirect('back')
        }
    } catch (err) {
        console.log("err in creating post", err);
        return;
    }
}