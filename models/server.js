
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const path = require("path");
const Sockets = require("./sockets");
const { dbConnection } = require("../database/config");
const cors = require("cors");

cors;
class Server {
  constructor() {
    this.app = express();
    this.server = http.createServer(this.app);
    this.io = socketIo(this.server);
    this.port = process.env.PORT;

    // Conectar a DB
    dbConnection();

  }

  middlewares() {
    this.app.use(express.static(path.resolve(__dirname, "/public")));

    // CORS
    this.app.use(cors());

    // Parseo del body
    this.app.use(express.json());

    // API ENDPoitns
    this.app.use("/api/login", require("../router/auth"));
    this.app.use("/api/messages", require("../router/messages"));

  }

  sockets() {
    new Sockets(this.io);
  }

  execute() {
    this.middlewares();
    this.sockets();
    this.server.listen(this.port, () => {
      console.log("Server corriendo en puerto", this.port);
    });
  }
}

module.exports = Server;