const dbconnection = require('../dbConnection');

const deleteStdProjectQuery = id => new Promise((resolve, reject) => {
  const sql = {
    text: 'DELETE FROM std_project where id=$1  ',
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

module.exports = { deleteStdProjectQuery };
