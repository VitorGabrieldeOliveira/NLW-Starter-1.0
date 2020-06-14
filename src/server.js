const express = require('express');
const server = express();

const database = require('./database/db');

server.use(express.static('public'));

// Enable req.body
server.use(express.urlencoded({ extended: true }));

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

server.post('/savepoint', (request, response) => {

  const query = `
    INSERT INTO places (
      image,
      name,
      address,
      address2,
      state,
      city,
      items
    ) VALUES (?,?,?,?,?,?,?);
  `;

  const values = [
    request.body.image,
    request.body.name,
    request.body.address,
    request.body.address2,
    request.body.state,
    request.body.city,
    request.body.items
  ];

  function afterInsertData(error) {
    if (error) {
      console.log(error);
      return response.send('Registration error!');
    }

    console.log('Data successfully registered');
    console.log(this);

    return response.render('create-point.html', { saved: true });
  }

  database.run(query, values, afterInsertData);

});

server.get('/search', (request, response) => {

  const search = request.query.search;

  if (search === '') {
    return response.render('search-results.html', { totalPlaces: 0 });
  }

  // Get database data
  database.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(error, rows) {
    if (error) {
      return console.log(error);
    }

    const totalPlaces = rows.length;

    // Show the Search Results page with data from the database
    return response.render('search-results.html', { places: rows, totalPlaces });
  });
});

// Turn on the server
server.listen(3000);