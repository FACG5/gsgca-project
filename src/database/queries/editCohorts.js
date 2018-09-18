const dbconnection = require('../db_connection');

const editCohorts = cohortData => new Promise((resolve, reject) => {
  const {
    name, description, githubLink, imgUrl, cohortId,
  } = cohortData;
  const sql = {
    text: 'UPDATE cohort SET name = $1, description = $2, githublink = $3, img_url = $4 WHERE id=$5;',
    values: [name, description, githubLink, imgUrl, cohortId],
  };
  dbconnection.query(sql, (err, res) => {
    if (err) {
      reject(err);
    } else {
      resolve(res.rows);
    }
  });
});

module.exports = { editCohorts };
