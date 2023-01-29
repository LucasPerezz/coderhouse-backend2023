const express = require('express');
const handlebars = require('express-handlebars');
const http = require('http');
const productsRouter = require('./routes/products.routes');
const { Server } = require('socket.io');
const dotenv = require('dotenv')

const app = express();
const server = http.createServer(app)
const io = new Server(server);


const cartsRouter = require('./routes/carts.routes');
const viewsRouter = require('./routes/views.router');
const mongoose = require('mongoose');


const port = 8080;
dotenv.config()

app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/', viewsRouter);


io.on('connection', (socket) => {
  console.log('a user connected');


    socket.on("disconnect", () => {
      console.log("user disconnected")
    })

});

server.listen(port, () => {
  console.log("Listening on 8080")
});

mongoose.connect(`mongodb+srv://coderuser:${process.env.PASSWORD}@backendcoder.qlbmmgi.mongodb.net/?retryWrites=true&w=majority`, (err) => {
  if(err) {
    console.log("Cannot conect to database: " + err)
    process.exit()
  } else {
    console.log("Conectado a la base de datos");
  }
})


