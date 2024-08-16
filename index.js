const express = require("express");
const socket = require("socket.io");
const http = require("http");
const { Chess } = require("chess.js");
const exp = require("constants");
const path = require("path");

const app = express();

const server = http.createServer(app);
const io = socket(server);
const chess = new Chess();
let players = {};
let currentPlayer = "W";

app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index", { title: "Chess Game" });
});

io.on("connection", function (uniqueSocket) {
  console.log("connected");
});

server.listen(3000, () => {
  console.log("running on port 3000");
});
