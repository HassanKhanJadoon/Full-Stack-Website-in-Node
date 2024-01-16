import express from "express";
import bodyParser from "body-parser";
import path from "path";
const port = process.env.PORT || 3000;
import "./db/conn.mjs";
import router from "./routes/route.mjs";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import session from "express-session";
import flash from "connect-flash";
// import exphbs from "express-handlebars";
import hbs from "hbs";

//initialize app
const app = express();

// Initialize connect-flash
app.use(flash());

// Register handlebars as the view engine
// app.engine(
//     'hbs',
//     exphbs({
//       extname: '.hbs',
//       helpers: {
//         range: function (start, end) {
//           const result = [];
//           for (let i = start; i <= end; i++) {
//             result.push(i);
//           }
//           return result;
//         },
//       },
//     })
//   );

// Set up Handlebars
app.set('view engine', 'hbs');
hbs.registerPartials(path.join('./template/partials'));
const partialPath = path.join(process.cwd() , './template/views')
app.set('views', partialPath);

//using ejs
// app.set("view engine", 'ejs');
// Specify the path to views and public files
// app.set('views', path.join('./template/views'));

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
app.use(router)

//server
app.listen(port, () => {
    console.log(`Your server is started on Port ${port}`)
})