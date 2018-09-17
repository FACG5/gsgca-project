const dbconnection = require('../db_connection');

const deleteCohort = id => new Promise((resolve, reject) => {
  const sql = {
    text: 'DELETE FROM cohort where id = $1  ',
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

module.exports = { deleteCohort };
