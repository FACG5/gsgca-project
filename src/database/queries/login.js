const dbConnection = require('../dbConnection');

const loginQuery = (username, cb) => {
  const sql = {
    text: 'select * from admin where username = $1',
    values: [username],
  };
  dbConnection.query(sql, (err, result) => {
    if (err) return cb(err);
    return cb(null, result.rows);
  });
};

module.exports = loginQuery;
