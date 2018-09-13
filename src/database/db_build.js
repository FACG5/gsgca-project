const fs = require('fs');
const path = require('path');
const dbConnection = require('./db_connection');

const sql = fs.readFileSync(path.join(__dirname, '/db_build.sql')).toString();

const runbuild = cb => dbConnection.query(sql, (err, res) => {
  if (err) { cb(err); }
  cb(null, res);
});
module.exports = runbuild;
