const express = require("express");
const bodyParser = require("body-parser");

const db = require('./db');

const app = express();
app.use(bodyParser.json());

app.get('/api',(req,res)=>{
    res.status(200).send("gi")
})

db.pool.query(`CREATE TABLE lists (
    id INTEGER AUTO_INCREMENT,
    value TEXT, 
    PRIMARY KEY (id)
)`, (err, results, fileds) => {
    console.log('results', results)
})


app.get('/api/getvalues', function(req, res){
    db.pool.query('SELECT * FROM lists;',
    (err, doc, fileds)=>{
        if (err) 
            return res.status(404).send(err)
        else
            return res.json(doc)
    })
})

app.post('/api/values',(req,res,next)=>{
    db.pool.query(`INSERT INTO lists (value) VALUES("${req.body.value}")`,
    (err, doc, fileds) =>{
        if(err) 
            return res.status(500).send(err);
        else
            return res.json({success:true, value:req.body.value})
    })
})

app.listen(5000, ()=> console.log( "server listenig..."))