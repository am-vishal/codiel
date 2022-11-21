const express = require("express")
const app = express()
const port = 8000

app.listen("/", function (err) {
    try {
        console.log("Port is running on", port)
    } catch (error) {
        console.log("Error occur", err)
    }
})