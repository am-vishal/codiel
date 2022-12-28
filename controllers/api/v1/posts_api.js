const Post = require("../../../models/post");
const Comment = require("../../../models/comment");

module.exports.index = async (req, res) => {
    let posts = await Post.find({})
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        });
    return res.status(200).json({
        message: "List of post",
        post: posts
    })
}

module.exports.destroy = async (req, res) => {
    try {
        let post = await Post.findById(req.params.id)
        if (post.user == req.user.id) {
            post.remove();
            await Comment.deleteMany({ post: req.params.id })
            return res.status(200).json({ message: "Post and associated comments deleted successfully!" })
        } else {
            res.status(401).json({ message: "you cannot delete this post" })
        }
    } catch (err) {
        res.status(500).json({ message: "Internal server error" })
    }
}