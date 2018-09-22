const dbConnection = require('../dbConnection');

const updateStudentQuery = (studentData, id, cb) => {
  const {
    name, username, htmlUrl, avatarUrl,
  } = studentData;

  const sql = {
    text: 'UPDATE student SET name =$2, username = $3 , githublink = $4, img_url = $5 WHERE id = $1',
    values: [id, name, username, htmlUrl, avatarUrl],
  };
  dbConnection.query(sql, (err, result) => {
    if (err) return cb(err);
    return cb(null, result.rows);
  });
};


module.exports = updateStudentQuery;
