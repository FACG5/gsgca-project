const dbConnection = require('../db_connection');

const addStudentQuery = (newStudent, cb) => {
  const {
    name, username, htmlUrl, avatarUrl, cohortID,
  } = newStudent;

  const sql = {
    text: 'INSERT INTO student (name, username, githublink, imgurl, cohort_id) values ($1,$2,$3,$4,$5) RETURNING name',
    values: [name, username, htmlUrl, avatarUrl, cohortID],
  };
  dbConnection.query(sql, (err, result) => {
    if (err) return cb(err);
    return cb(null, result.rows);
  });
};


module.exports = addStudentQuery;
