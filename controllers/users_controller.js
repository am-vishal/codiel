const User = require('../models/user');
const fs = require('fs');
const path = require('path');


module.exports.profile = (req, res) => {
    User.findById(req.params.id, (err, user) => {
        return res.render('user_profile', {
            title: 'User Profile',
            profile_user: user
        });
    });
}

// User.findByIdAndUpdate(req.params.id, req.body, (err, user) => {
//     return res.redirect('back');
// });
module.exports.update = async (req, res) => {
    if (req.user.id == req.params.id) {
        try {
            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req, res, (err) => {
                if (err) { console.log('*****Multer Error*****', err) };
                user.name = req.body.name
                user.email = req.body.email
                if (req.file) {
                    // when user.avatr is null will throw err
                    // find if avatr is there and link is available then only
                    if (user.avatar) {
                        fs.unlinkSync(path.join(__dirname, '..', user.avatar))
                    }
                    // this is saving the path of uploeded file into avatar field in the user
                    user.avatar = User.avatarPath + '/' + req.file.filename
                }
                user.save();
                return res.redirect('back');
            })
        } catch (err) {
            req.flash("error", err);
            return res.redirect('back');
        }
    } else {
        req.flash("error", 'Unauthorized');
        return res.status(401).send('Unauthorized');
    }
}


// render the sign up page
module.exports.signUp = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }


    return res.render('user_sign_up', {
        title: "Codeial | Sign Up"
    })
}


// render the sign in page
module.exports.signIn = function (req, res) {

    if (req.isAuthenticated()) {
        
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in', {
        title: "Codeial | Sign In"
    })
}

// get the sign up data
module.exports.create = function (req, res) {
    if (req.body.password != req.body.confirm_password) {
        return res.redirect('back');
    }

    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) { console.log('error in finding user in signing up'); return }

        if (!user) {
            User.create(req.body, function (err, user) {
                if (err) { console.log('error in creating user while signing up'); return }

                return res.redirect('/users/sign-in');
            })
        } else {
            return res.redirect('back');
        }

    });
}


// sign in and create a session for the user
module.exports.createSession = async (req, res) => {
    await req.flash('success', req.message || 'Logged in Successfully');
    return res.redirect('/');
}

module.exports.destroySession = function (req, res, next) {
    req.logout(function (err) {
        req.flash('success', 'You have logged out!');
        if (err) return next(err);
        res.redirect('/');
    });
    return res.redirect('/');
}