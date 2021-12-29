const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const consign = require('consign');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const methodOverride = require('method-override');
const error = require('./middlewares/error');


const app = express();
const server = http.Server(app);
const io = socketIO(server);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(cookieParser('ntalk'));
app.use(expressSession());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

consign({})
  .include('models')
  .then('controllers')
  .then('routes')
  .into(app);

io.on('connection', (client) => {
  client.on('send-server', (data) => {
    const resposta = `<b>${data.nome}:</b> ${data.msg}<br>`;
    client.emit('send-client', resposta);
    client.broadcast.emit('send-client', resposta);
  });
});

app.use(error.notFound);
app.use(error.serverError)

app.listen(3000, () => {
  console.log('Ntalk no ar!');
});

