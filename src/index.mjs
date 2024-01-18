import express from "express";
import bodyParser from "body-parser";
import path from "path";
import "./db/conn.mjs";
import router from "./routes/route.mjs";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import session from "express-session";
import flash from "connect-flash";
import hbs from "hbs";

//assigning port for server
const port = process.env.PORT || 3000;

//initialize app
const app = express();

// Initialize connect-flash
app.use(flash());

// Set up Handlebars
app.set('view engine', 'hbs');
hbs.registerPartials(path.join('./template/partials'));
const partialPath = path.join(process.cwd(), './template/views')
app.set('views', partialPath);

// connect the static files
app.use(express.static('public'))

// Use cookie-parser middleware
app.use(cookieParser());

// Session middleware setup
app.use(session({
    secret: "5ebe2294ecd0e0f08eab7690d2a6ee69",
    // secret: process.env.SESSION_SECRET, //using secret sesssion from .env but it is not working now
    saveUninitialized: true,
    resave: true
}));

// Initialize connect-flash
app.use(flash());

//config dotenv
dotenv.config();

// Middleware for parsing application/json
app.use(express.json());

//Middleware
app.use(bodyParser.urlencoded({ extended: true }));


//routes
app.use(router);

//server using app
app.listen(port, () => {
    console.log(`Your server is started on Port ${port}`)
})