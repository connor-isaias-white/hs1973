const express = require('express');
const http = require('http');
const formidable = require('formidable');
const fs = require('fs')
const busboy = require('connect-busboy');
var path = require('path');
const app = express();
app.use(express.json());
app.use(busboy());
app.use(express.static(path.join(__dirname, '../mods')));
app.use(express.urlencoded());

let data = JSON.parse(fs.readFileSync("mods/mods.json"));
app.get('/', function(req, res) {
    res.sendfile("src/mcmods.html");
});

app.get('/upload', function(req, res) {
    res.sendfile("src/upload.html");
});

app.get('/script', function(req, res) {
    res.sendfile("src/script.js");
});

app.get('/style', function(req, res) {
    res.sendfile("src/style.css");
});

app.get('/data', function(req, res) {
    res.json(data);
});

app.route('/uploadit')
    .post(function (req, res, next) {
        upload = {}
        let fstream;
        req.pipe(req.busboy);
        //console.log(req);
        req.busboy.on('file', function (field, file, filename) {
            //Path where image will be uploaded
            console.log("field:", field);
            upload[field] = filename;
            fstream = fs.createWriteStream(__dirname + '/../mods/' + filename);
            file.pipe(fstream);
            fstream.on('close', function () {
            });
        });
        req.busboy.on('field', function (fieldname, content) {
            console.log("fieldname: ", fieldname);
            if (fieldname == "g-recaptcha-response" && content=="" || fieldname == "Author" && content==""){
                res.redirect('/upload');
            }
            else if (fieldname == "g-recaptcha-response" && content!="") {
                data.push(upload)
                json = JSON.stringify(data);
                fs.writeFile('mods/mods.json', json, 'utf8', () => {res.redirect('/')});
            }
            else if (fieldname != "" && content!="") {
                upload[fieldname] = content;
            }
            else {
                console.log(content);
            }
        });
    });

app.listen(3000, function() {
    console.log('listening on port 3000');
});
