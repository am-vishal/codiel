const Post = require("../models/post");



module.exports.home = (req, res) => {
    // res.cookie("user_id", 25)
    Post.find({})
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: "user"
            }
        })
        .exec((err, posts) => {
            return res.render("home", {
                title: "Codiel | Home",
                posts: posts
            })
        })
}

// module.exports.actionName = function(req, res){}