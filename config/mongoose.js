const mongoose = require("mongoose");

// mongoose.connect('mongodb://0.0.0.0:27017/codiel_development');

// const db = mongoose.connection;

// db.on("error", console.error.bind(console, "Error connecting to MongoDB"))


//up and running then print the message
// db.once('open', function () {
//     console.log("Connected to DB");
// });

// const mongoose = require('mongoose');

mongoose.set("strictQuery", false);
mongoose.connect("mongodb://0.0.0.0:27017/codiel_development", () => {
    console.log("Connected to MongoDB");
});