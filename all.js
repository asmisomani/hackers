//importing
const express=require('express');
const ejs=require("ejs")
const bodyParser=require('body-parser')
const mysql=require("mysql")
const app=express();
const path=require("path")
const ejsLint = require('ejs-lint');

//running ejs
app.set('view engine','ejs')
app.set('views', path.join(__dirname,'views'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'public')));

//creating port
const port=process.env.PORT || 5000;
app.listen(port,function(){
    console.log(`Running on port ${port}`)
})

//connection with sql
const connection=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"onedance",
    database:"hackers",
    port:"3306"
})
connection.connect(function(err){
    if(err) throw err;
    else{
        console.log(`Connected to MySQL`)
    }
})

//getting the values
app.get('/all',function(req,res){
    connection.query('SELECT * from list',function(err,rows,fields){
        if(err) throw err;
        else{
            res.render('all',{
                title:'hackers',
                name:rows
            })
        }
    })
})
app.get('/top',function(req,res){
    connection.query('SELECT * from list LIMIT 3',function(err,rows,fields){
        if(err) throw err;
        else{
            res.render('top',{
                title:'hackers',
                name:rows
            })
        }
    })
})

