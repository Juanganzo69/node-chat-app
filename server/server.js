const path = require('path');
const express = require('express');
var port = process.env.PORT || 3000;

const publicPath = path.join(__dirname, '../public');


var app = express();

app.use(express.static(publicPath));

app.listen(port, ()  => {
    console.log(`El servidor está escuchando en el puerto ${ port }`);
});