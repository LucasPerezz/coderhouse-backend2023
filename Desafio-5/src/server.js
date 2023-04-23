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
const cors = require('cors');
const nodemailer = require('nodemailer');
const twilio = require('twilio');
require('dotenv').config();
const errorHandler = require('./services/errorHandler.middleware');



//Servidor instanciado
const app = express();
const server = http.createServer(app)
const io = new Server(server);

//Instancia de rutas
const productsRouter = require('./routes/products.routes');
const cartsRouter = require('./routes/carts.routes');
const MessageManager = require('./dao/MessageManager');
const sessionsRouter = require('./routes/sessions.routes')
const viewsRouter = require('./routes/views.router');
const compression = require('express-compression');


const port = process.env.PORT | 8080;

/**************************** MAILING & TWILIO ***********************/

// //Mailing. User y Pass convertir en variable de entorno
// const transport = nodemailer.createTransport({
//   service: 'gmail',
//   port: 587,
//   auth: {
//     user: 'Mi correo',
//     pass: "Mi contrasena"
//   }
// })

// //Convertirlas en variables de entorno
// const TWILIO_ACCOUNT_SID = "";
// const TWILIO_AUTH_TOKEN = "";
// const TWILIO_SMS_NUMBER = "";

// const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_SMS_NUMBER);

// app.get('/sms', async (req, res) => {
//   let result = await client.messages.create({
//     body: "Mensaje",
//     from: TWILIO_SMS_NUMBER,
//     to: 'Numero de prueba'
//   })
// })


//Middlewares
app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(session({
  secret:'codersecret',
  resave:false,
  saveUninitialized:false,
  store: MongoStore.create({
      mongoUrl: "mongodb+srv://coderuser:123@backendcoder.qlbmmgi.mongodb.net/?retryWrites=true&w=majority",
      mongoOptions:{useNewUrlParser:true,useUnifiedTopology:true},
      ttl:30
  }),
}));
app.use(cors());
app.use(compression({
  brotli: {enable: true, zlib:{}}
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
app.use(errorHandler);


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


server.listen(port, () => {
  console.log("Listening on 8080")
});


//MongoDB
mongoose.connect("mongodb+srv://coderuser:123@backendcoder.qlbmmgi.mongodb.net/?retryWrites=true&w=majority", (err) => {
  if(err) {
    console.log("Cannot conect to database: " + err)
    process.exit()
  } else {
    console.log("Conectado a la base de datos");
  }
})




