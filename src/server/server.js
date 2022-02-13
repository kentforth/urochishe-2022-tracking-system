const serialPort = require("serialport");
const ReadLine = require("@serialport/parser-readline");
const { Server } = require("socket.io");
const express = require("express");
const http = require("http");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: "*" });

const hostname = "127.0.0.1";
const serverPort = 8000;

const port = new serialPort("COM7", {
  baudRate: 9600,
});

const parser = new ReadLine({ delimiter: "\r\n" });
port.pipe(parser);

app.use(
  cors({
    origin: "*",
  })
);

server.listen(serverPort, hostname, function () {
  console.log("Server is running...");
});

parser.on("data", function (data) {
  io.emit("bicycleNumber", data);
});
