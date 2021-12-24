const express = require('express');
const path = require('path');
const routes = require('./routes/index');
const users = require('./routes/users');
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view egine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/usuarios', users);

app.listen(3000, () => {
  console.log('Ntalk no ar!');
});

