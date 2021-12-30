module.exports = (app, io) => {
  io.on('connection', (client) => {
    client.on('send-server', (data) => {
      const resposta = `<b>${data.nome}:</b> ${data.msg}<br>`;
      client.emit('send-client', resposta);
      client.broadcast.emit('send-client', resposta);
    });
  });
}