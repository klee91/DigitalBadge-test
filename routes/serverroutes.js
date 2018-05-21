const express = require('express');
const app = express();

// ==================== SERVER ROUTES ====================
app.get('/', function (req, res) {
    res.sendFile(__dirname + "/public/index.html");
});

app.get('/dashboard', function (req, res) {
    res.sendFile(__dirname + "/public/index.html");
});

app.get('/login', function(req,res) {
    res.sendFile(__dirname + "/public/index.html");
});

app.get('/students', function(req,res) {
    res.sendFile(__dirname + "/public/index.html");
});

app.get('/students/:studentId', function(req,res) {
    res.sendFile(__dirname + "/public/index.html");
});

app.get('/teachers', function(req,res) {
    res.sendFile(__dirname + "/public/index.html");
});

app.get('/teachers/:teacherId', function(req,res) {
    res.sendFile(__dirname + "/public/index.html");
});


module.exports = app;