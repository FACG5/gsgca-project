const dbConnection = require('../db_connection');

const deleteProjectQuery = ({ projectId, cohortId }, cb) => {
  const sql = {
    text: 'DELETE FROM project where id=$1 AND cohort_id=$2',
    values: [projectId, cohortId],
  };
  dbConnection.query(sql, (err, result) => {
    if (err) return cb(err);
    return cb(null, result.rows);
  });
};

module.exports = deleteProjectQuery;
