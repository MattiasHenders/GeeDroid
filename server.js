const express = require("express");

const server = express();

server.all("/", (req, res) => {
    res.send("GeeDroid is running!");
});

function keepAlive() {
    server.listen(3000, () => {
        console.log("GeeDroid Server is ready!");
    });
}

module.exports = keepAlive;