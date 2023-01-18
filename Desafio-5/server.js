const express = require('express');
const handlebars = require('express-handlebars');
const http = require('http');
const app = express();
const server = http.createServer(app)
const { Server } = require('socket.io')
const productsRouter = require('./routes/products.routes');
const io = new Server(server);


const cartsRouter = require('./routes/carts.routes');
const viewsRouter = require('./routes/views.router');


const port = 8080;

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
})


