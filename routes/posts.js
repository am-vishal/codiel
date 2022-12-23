const express = require('express');
const router = express.Router();

const postController = require("../controllers/post_controller");
router.post("/create", postController.create)
// console.log("router loaded");
// router.get("/", homeController.home);
// router.use("/users", require("./users"));
// router.use("/posts", require("./posts"));

module.exports = router;