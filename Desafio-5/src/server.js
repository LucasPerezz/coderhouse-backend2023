//Modulos
const express = require('express');
const handlebars = require('express-handlebars');
const http = require('http');
const { Server } = require('socket.io');
const session = require('express-session')
const MongoStore = require('connect-mongo')
const passport = require('passport');
const initializePassport = require('./config/passport-config');
const mongoose = require('mongoose');
const config = require('./config/config')

//Servidor instanciado
const app = express();
const server = http.createServer(app)
const io = new Server(server);

//Instancia de rutas
const productsRouter = require('./routes/products.routes');
const cartsRouter = require('./routes/carts.routes');
const MessageManager = require('./manager/MessageManager');
const sessionsRouter = require('./routes/sessions.routes')
const viewsRouter = require('./routes/views.router');


const port = 8080;

//Middlewares
app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(session({
  secret:'codersecret',
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7
  },
  resave:true,
  saveUninitialized:true,
  store: MongoStore.create({
      mongoUrl: config.mongoUrl,
      mongoOptions:{useNewUrlParser:true,useUnifiedTopology:true},
      ttl:30
  }),
}));

initializePassport();
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next)=>{     // Middleware para agregar a las variables locales del objeto Response los datos de sesión.
  res.locals.session = req.session;
  next();
})

//Rutas
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/sessions', sessionsRouter);
app.use('/', viewsRouter);


//Chat
const messageDB = MessageManager;
const conectedUsers = [];

io.on('connection', socket=>{
    console.log("Cliente conectado.");

    socket.on('new_message', async message=>{
        await messageDB.addMessage(message);

        let messages = await messageDB.getMessages().lean();
        console.log(messages);
        
        io.emit('messages_log', messages);
    });

    socket.on('new_user', async user=>{
        let messages = await messageDB.getMessages().lean();
        let validationObj = {
            validation: true,
            user,
            messages
        }

        if(conectedUsers.includes(user)){
            validationObj.validation = false;
        }else{
            conectedUsers.push(user);
        }

        socket.emit('auth_user', validationObj);
        if(validationObj.validation) socket.broadcast.emit('new_user_connected', user);
    });
})


server.listen(config.port, () => {
  console.log("Listening on 8080")
});


//MongoDB
mongoose.connect(STRING_CONNECTION, (err) => {
  if(err) {
    console.log("Cannot conect to database: " + err)
    process.exit()
  } else {
    console.log("Conectado a la base de datos");
  }
})




