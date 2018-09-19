const dbConnection = require('../db_connection');

const getAllProjects = (cb) => {
  const sql = {
    text: 'select * from project',
  };
  dbConnection.query(sql, (err, result) => {
    if (err) return cb(err);
    return cb(null, result.rows);
  });
};

module.exports = getAllProjects;
