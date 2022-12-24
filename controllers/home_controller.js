const Post = require("../models/post");
const User = require("../models/user");

// async await
module.exports.home = async (req, res) => {
    try {
        // populate the user of each post
        let posts = await Post.find({})
            .populate('user')
            .populate({
                path: 'comments',
                populate: {
                    path: 'user'
                }
            });
        let users = await User.find({});
        return res.render('home', {
            title: "Codeial | Home",
            posts: posts,
            all_users: users
        });

    } catch (err) {
        console.log('Error', err);
        return;
    }
}

// callback hell
// module.exports.home = (req, res) => {
//     Post.find({})
//         .populate('user')
//         .populate({
//             path: 'comments',
//             populate: {
//                 path: "user"
//             }
//         })
//         .exec((err, posts) => {
//             User.find({}, (err, users) => {
//                 return res.render('home', {
//                     title: "Codeial | Home",
//                     posts: posts,
//                     all_users: users
//                 });

//             })
//         })
// }
