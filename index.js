const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
// used for session cookie
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const customMware = require('./config/middleware');
const passportJwt = require('./config/passport-jwt-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');
app.use(express.urlencoded({ extended: true }))

app.use(cookieParser());

app.use(express.static('./assets'));
// make the upload path available to the browswer
app.use('/uploads', express.static(__dirname + '/uploads'))

app.use(expressLayouts);
// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

const url = "mongodb://0.0.0.0:27017/codiel_development"

// mongo store is used to store the session cookie in the db
app.use(session({
    name: 'codeial',
    // TODO change the secret before deployment in production mode
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: MongoStore.create({
        mongoUrl: "mongodb://0.0.0.0:27017/codiel_development",
        autoRemove: 'disabled'

    },
        function (err) {
            console.log(err || 'connect-mongodb setup ok');
        }
    )
    //     {
    //         mongooseConnection: db,
    //         autoRemove: 'disabled'

    //     },
    //     function (err) {
    //         console.log(err || 'connect-mongodb setup ok');
    //     }
    // )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);
// use express router
app.use('/', require('./routes'));


app.listen(port, function (err) {
    if (err) {
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});
