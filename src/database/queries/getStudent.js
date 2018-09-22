const dbconnection = require('../dbConnection');

const getStudentQuery = id => new Promise((resolve, reject) => {
  const sql = {
    text: 'SELECT * FROM student where id=$1 ',
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

module.exports = getStudentQuery;
