const dbConnection = require('../dbConnection');

const getCohortsQuery = (cb) => {
  const sql = {
    text: 'select * from cohort',
  };
  dbConnection.query(sql, (err, result) => {
    if (err) return cb(err);
    return cb(null, result.rows);
  });
};

module.exports = getCohortsQuery;
