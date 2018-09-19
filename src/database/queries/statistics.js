const dbConnection = require('../db_connection');

const getStatistics = (cb) => {
  const sql = {
    text: 'select (select count(*) from cohort) as count_cohort, (select count(*) from project) as count_project, (select count(*) from student) as count_student',
  };
  dbConnection.query(sql, (err, result) => {
    if (err) return cb(err);
    return cb(null, result.rows);
  });
};

module.exports = getStatistics;
