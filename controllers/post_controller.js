const Comment = require('../models/comment');
const Post = require('../models/post');
const Like = require('../models/like');

module.exports.create = async (req, res) => {
    try {
        await Post.create({
            content: req.body.content,
            user: req.user._id
        })
        req.flash('success', 'Post published!');
        return res.redirect("back");
    } catch (err) {
        req.flash('error', err);
        return;
    }
}

module.exports.destroy = async (req, res) => {
    try {
        let post = await Post.findById(req.params.id)
        if (post.user == req.user.id) {
            await Like.deleteMany({ likeable: post, onModel: 'Post' });
            await Like.deleteMany({ _id: { $in: post.comments } });
            post.remove();
            await Comment.deleteMany({ post: req.params.id })
            req.flash('success', 'Post and associated comments deleted!');
            return res.redirect('back')
        } else {
            req.flash('error', 'You cannot delete this post!');
            return res.redirect('back')
        }
    } catch (err) {
        req.flash('error', err);
        return;
    }
}