const express=require("express");

const app=express();

const path=require('path');

const bodyParser=require("body-parser");

const mySql=require('mysql');

const dotEnv=require('dotenv');

const cookieParser=require('cookie-parser');

dotEnv.config({path:"./.env"});

//database info
const db=mySql.createConnection({
    host: process.env.DATABASE_HOST,
    user:process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database:process.env.DATABASE
});


//database connection
db.connect((err)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log("connected");
    }
});

const publicDirectory=path.join(__dirname, './public');

app.use(express.static(publicDirectory));  //to use all css and javascriot or static files

app.use(express.urlencoded({extended: false})); //to sent any HTML form

app.use(express.json()); // parse JSON bodies (as SENT by API clients)

app.use(cookieParser());

app.set('view engine', 'hbs');


//define routes

app.use('/',require('./routes/page'));
app.use('/',require('./routes/auth'));



app.listen(3000,()=>{
    console.log("server started");
})