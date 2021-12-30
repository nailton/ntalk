module.exports = (app, io) => {
  io.on('connection', (client) => {
    const { session } = client.handshake;
    const { usuario } = session;

    client.on('send-server', (msg) => {
      const resposta = `<b>${usuario.nome}:</b> ${msg}<br>`;
      client.emit('send-client', resposta);
      client.broadcast.emit('send-client', resposta);
    });
  });
}