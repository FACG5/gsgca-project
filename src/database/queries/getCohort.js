const dbconnection = require('../db_connection');

const getCohortdata = id => new Promise((resolve, reject) => {
  const sql = {
    text: 'SELECT * FROM cohort where id=$1 ',
    values: [id],
  };
  dbconnection.query(sql, (err, res) => {
    if (err) {
      reject(err);
    } else {
      resolve(res.rows);
    }
  });
});

module.exports = { getCohortdata };
