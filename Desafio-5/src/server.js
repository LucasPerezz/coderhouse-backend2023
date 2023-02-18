const express = require('express');
const handlebars = require('express-handlebars');
const http = require('http');
const { Server } = require('socket.io');
const dotenv = require('dotenv')

const app = express();
const server = http.createServer(app)
const io = new Server(server);


const productsRouter = require('./routes/products.routes');
const cartsRouter = require('./routes/carts.routes');
const MessageManager = require('./manager/MessageManager');
const viewsRouter = require('./routes/views.router');
const mongoose = require('mongoose');


const port = 8080;
dotenv.config();
const PASSWORD = process.env.PASSWORD;
const USERNAME = process.env.USERNAME;
const STRING_CONNECTION = `mongodb+srv://coderuser:123@backendcoder.qlbmmgi.mongodb.net/?retryWrites=true&w=majority`

app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/', viewsRouter);

const conectedUsers = [];

io.on('connection', socket => {
  console.log('Cliente conectado');


  socket.on('new_message', async msg => {
    await MessageManager.addMessage(msg);

    let messages = await MessageManager.getMessages().lean();

    io.emit('messages_log', messages)
  })

  socket.on('new_user', async user => {
    let messages = await MessageManager.getMessages().lean();
    let validationObj = {
      validation: true,
      user,
      messages
    }

    if(conectedUsers.includes(user)) {
      validationObj.validation = false
    } else {
      conectedUsers.push(user);
    }

    socket.emit('auth_user', validationObj);

    if(validationObj.validation) socket.broadcast.emit('new_user_connected', user);
  })
})


server.listen(port, () => {
  console.log("Listening on 8080")
});



mongoose.connect(STRING_CONNECTION, (err) => {
  if(err) {
    console.log("Cannot conect to database: " + err)
    process.exit()
  } else {
    console.log("Conectado a la base de datos");
  }
})




