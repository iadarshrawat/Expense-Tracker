import express from 'express';
const app = express();
import connectionDB from './config/db.js';
import User from './models/user.model.js';
import bodyparser from 'body-parser';
import cookieParser from "cookie-parser";
import { isAuth, login, logout, register } from './controllers/user.controllers.js';
import { getLogs } from './controllers/log.controllers.js';


connectionDB();
app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())
app.use(cookieParser())

app.post('/register', register)
app.post('/login', login)
app.post('/logout', logout)
app.get('/getlogs', isAuth, getLogs);

app.listen(8000, ()=>{
    console.log("server is running at port 8000");
})