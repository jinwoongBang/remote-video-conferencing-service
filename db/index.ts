const mariadb = require('mariadb');
const connectionPool = mariadb.createPool({
  host: 'mydb.com',
  user: 'myUser',
  password: 'myPassword',
  connectionLimit: 5,
});

module.exports = connectionPool;
