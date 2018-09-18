const dbConnection = require('../db_connection');

const deleteStudentQuery = ({ stdId, cohortId }, cb) => {
  const sql = {
    text: 'DELETE FROM student where id=$1 AND cohort_id=$2',
    values: [stdId, cohortId],
  };
  dbConnection.query(sql, (err, result) => {
    if (err) return cb(err);
    return cb(null, result.rows);
  });
};

module.exports = deleteStudentQuery;
