const serialPort = require("serialport");
const { Server } = require("socket.io");
const express = require("express");
const http = require("http");
const cors = require("cors");

const fileReader = require("./fileReader");
fileReader.readLogFile();

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: "*" });

const hostname = "127.0.0.1";
const serverPort = 8000;

/*
const port = new serialPort("COM3", {
  autoOpen: true,
  baudRate: 57600,
  parser: new serialPort.parsers.Readline("\r\n"),
});
*/

/*port.on("data", (data) => {
  console.log(data);
});*/

app.use(
  cors({
    origin: "*",
  })
);

server.listen(serverPort, hostname, function () {
  console.log("Server is running...");
});
