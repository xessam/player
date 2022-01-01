var path = require("path");
var express = require("express");

var DIST_DIR = path.join(__dirname, "../dist");
var PORT = 3000;
var app = express();

console.log(DIST_DIR);
//Serving the files on the dist folder
app.use(express.static(DIST_DIR));

//Send index.html when the user access the web
app.get("*", function (req, res) {
  res.sendFile(path.join(DIST_DIR, "index.html"));
});

app.listen(PORT);


// 'use strict';

// const config = {
//     "example": {
//       "port": 3060,
//       "baseUrl": "http://localhost:3020/",
//       "publicBasename": "react-boilerplate/"
//     }
//   }
  

// const { example } = config;
// if (!example) throw new Error('configuration cannot be null/undefined');

// const PORT = example.port;

// const express = require('express');
// const path = require('path');

// const app = express();

// // Configure static resources
// app.use(express.static(path.join(__dirname, '/dist')));

// // Configure server-side routing
// app.get('*', (req, res) => {
//   const dist = path.join(__dirname, '/dist/index.html');
//   res.sendFile(dist);
// });

// // Open socket
// app.listen(PORT, () => {
//   console.log(`Started Express server on port ${PORT}`);
// });