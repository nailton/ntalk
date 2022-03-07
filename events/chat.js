module.exports = (app, io) => { 
  const onlines = {}; 
  io.on('connection', (client) => {
    const { session } = client.handshake;
    const { usuario } = session;

    onlines[usuario.email] = usuario.email;
    for (const email in onlines) {
      client.emit('notify-onlines', email);
      client.broadcast.emit('notify-onlines', email);
    }

    client.on('send-server', (hashDaSala, msg) => {
      const novaMensagem = { email: usuario.email, sala: hashDaSala};
      const resposta = `<b>${usuario.nome}:</b> ${msg}<br>`;
      session.sala = hashDaSala;
      client.broadcast.emit('new-message', novaMensagem);
      io.to(hashDaSala).emit('send-client', resposta);
      client.emit('send-client', resposta);
      client.broadcast.emit('send-client', resposta);
    });

    client.on('create-room', (hashDaSala) => {
      session.sala = hashDaSala;
      client.join(hashDaSala);
    });

    client.on('disconnect', () => {
      const { sala } = session;
      session.sala = null;
      client.leave(sala);
    });


  });
}