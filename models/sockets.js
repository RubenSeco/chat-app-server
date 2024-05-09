class Sockets {
  constructor(io) {
    this.io = io;
    this.socketEvents();
  }

  socketEvents() {
    // On connection
    this.io.on('connection', (socket) => {

      // TODO: Validar el JWT

      // Si el token no es válido, desconetar

      // TODO: Saber que usuario está activo mediante el UID

      // TODO: Emitir todos los usuarios conectados

      // TODO: Socket join (unir un usuario a una sala en particular)

      // TODO: Escuchar cuando un cliente manda un mensaje - mensaje personal

      // TODO: Disconnect - Marcar en la DB que el user se desconectó

      // TODO: Emitir todos los usuarios conectados


    });
  }


}

module.exports = Sockets;