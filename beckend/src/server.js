const express = require('express');
const mysql = require('mysql');

const app = express();

app.use(express.json());

var conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "cleedbook_e"
})

conn.connect(function(err) {
    if(err) throw err;
    console.log("Connected!");
});

app.post('/signup', (req, res) => {

    var reqjson = req.body;

    const signupQuery = "INSERT INTO usuarios(name, email, pwd, ativo) VALUES('" + reqjson.name + "', '" + reqjson.email + "', '" + reqjson.pwd + "', 1)";
    conn.query(signupQuery, function (error, results, fields) {
        if(error) return console.log(error);
        console.log('##QUERY EXECUTADA##');
    });

    console.log();
    console.log("##CADASTRANDO USUARIO##");
    console.log("USER: " + reqjson.name);
    console.log("EMAIL: " + reqjson.email);
    console.log("PASSWORD: " + reqjson.pwd);
    console.log("##USUARIO CADASTRADO!##");
    console.log();

    return res.json({ status: "done" });
});

app.post('/signin', (req, res) => {
    var logon = req.body;

    loginQuery = "SELECT * FROM usuarios WHERE email='" + logon.email + "' AND pwd='" + logon.pwd + "'";
    conn.query(loginQuery, function(error, results, fields) {
        if(error) return console.log(error);
        return res.json({ login: results[0].email, name: results[0].name });
    })

});

app.listen(3333);