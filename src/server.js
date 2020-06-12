const express = require('express');
const server = express();

server.use(express.static('public'));

// Nunjucks
const nunjucks = require('nunjucks');
const { response } = require('express');
nunjucks.configure('src/views', {
  express: server,
  noCache: true
});

// Initial routes
server.get('/', (request, response) => {
  return response.render('index.html');
});

server.get('/create-point', (request, response) => {
  return response.render('create-point.html');
});

server.get('/search', (request, response) => {
  return response.render('search-results.html');
});

// Turn on the server
server.listen(3000);