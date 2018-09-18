const dbConnection = require('../db_connection');

const getCohortsQuery = (cb) => {
  const sql = {
    text: 'select * from cohort',
  };
  dbConnection.query(sql, (err, result) => {
    console.log(result.rows)
    if (err) return cb(err);
    return cb(null, result.rows);
  });
};

module.exports = getCohortsQuery;
