const dbconnection = require('../dbConnection');

const addCohorts = (name, description, githublink, imgURl) => new Promise((resolve, reject) => {
  const sql = {
    text: 'INSERT INTO cohort (name, description, githublink, img_url) VALUES ($1, $2, $3,$4) ;',
    values: [name, description, githublink, imgURl],
  };
  dbconnection.query(sql, (err, res) => {
    if (err) {
      reject(err);
    } else {
      resolve(res.rows);
    }
  });
});

module.exports = { addCohorts };
