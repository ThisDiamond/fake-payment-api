import express, { Express } from "express";
import cors from "cors";
import { engine } from "express-handlebars";
import session from "express-session";
import flash from "connect-flash";
import cookieParser from "cookie-parser";

// helpers
import ifEqual from './helpers/ifequal'

// Router
import auth from "./routes/auth";
import index from "./routes";
import users from "./routes/users";
import admin from "./routes/admin";
import pay from './routes/pay'

const app: Express = express();

// Middlerwares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./public"));
app.use(session({ secret: "secret", resave: false, saveUninitialized: false }));
app.use(flash());
app.use(cookieParser());

// handlerbars
app.engine("hbs", engine({ extname: ".hbs", helpers: ifEqual }));
app.set("view engine", "hbs");
app.set("views", "./src/views");

// Router
app.use(index);
app.use(auth);
app.use(users);
app.use(admin);
app.use(pay)

// PORT
const PORT = process.env.PORT || 1112;
app.listen(PORT, () => console.log(`app running on port  ${PORT}`));
