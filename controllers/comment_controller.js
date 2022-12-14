const Comment = require('../models/comment');
const Post = require('../models/post');
const Like = require('../models/like');
const commentsMailer = require('../mailers/comments_mailer');

module.exports.create = async (req, res) => {
    try {
        let post = await Post.findById(req.body.post);
        if (post) {
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });
            post.comments.push(comment);
            post.save();
            comment = await comment.populate([{ path: 'user', select: 'name email' }]);
            commentsMailer.newComment(comment);
            req.flash('success', 'Comment published!');
            res.redirect('/');
        }
    } catch (err) {
        req.flash('error', err);
        return;
    }
}


module.exports.destroy = async (req, res) => {
    try {
        let comment = await Comment.findById(req.params.id);
        if (comment.user == req.user.id) {
            let postId = comment.post;
            comment.remove();
            let post = Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } });
            await Like.deleteMany({ likeable: comment._id, onModel: 'Comment' });
            req.flash('success', 'Comment deleted!');
            return res.redirect('back');
        } else {
            req.flash('error', 'Unauthorized');
            return res.redirect('back');
        }
    } catch (err) {
        req.flash('error', err);
        return;
    }
}