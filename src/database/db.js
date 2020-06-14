const sqlite3 = require('sqlite3').verbose();

// Create database object
const db = new sqlite3.Database('./src/database/database.db');

module.exports = db;
db.serialize(() => {
  //  Create a table
  // db.run(`
  //   CREATE TABLE IF NOT EXISTS places (
  //     id INTEGER PRIMARY KEY AUTOINCREMENT,
  //     image TEXT,
  //     name TEXT,
  //     address TEXT,
  //     address2 TEXT,
  //     state TEXT,
  //     city TEXT,
  //     items TEXT
  //   );
  // `);
  
  //  Insert data into the table
  // const query = `
  //   INSERT INTO places (
  //     image,
  //     name,
  //     address,
  //     address2,
  //     state,
  //     city,
  //     items
  //   ) VALUES (?,?,?,?,?,?,?);
  // `;

  // const values = [
  //   'https://images.unsplash.com/photo-1567393528677-d6adae7d4a0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
  //   'Papersider',
  //   'Guilherme Gemballa, Jardim América',
  //   'Número 260',
  //   'Santa Catarina',
  //   'Rio do Sul',
  //   'Resíduos Eletrônicos, Lâmpadas'
  // ];

  // function afterInsertData(error) {
  //   if (error) {
  //     return console.log(error);
  //   }

  //   console.log('Data successfully registered');
  //   console.log(this);
  // }

  // db.run(query, values, afterInsertData);

  // Query data in the table
  // db.all(`SELECT * FROM places`, function(error, rows) {
  //   if (error) {
  //     return console.log(error);
  //   }

  //   console.log('Here are your data:');
  //   console.log(rows);
  // });

  // Delete table data
  // db.run(`DELETE FROM places WHERE id = ?`, [2], function(error) {
  //   if (error) {
  //     return console.log(error);
  //   }

  //   console.log('Data successfully deleted');
  // });

});