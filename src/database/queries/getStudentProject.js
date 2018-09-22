const dbConnection = require('../dbConnection');
const getProjectByid = require('./getProjectByid');

const getStudentProjectQuery = (id, cb) => {
  const sql = {
    text: 'select project.project_type as project_type, std_project.id as "studentProjectId" ,project.id as projectId, cohort.id as cohortId ,student.githublink as "githubLink", cohort.name as cohort_name,project.id, student.name as "studentName" ,project.name as project_name ,project.description,project.githublink,project.websitelink from project JOIN std_project ON std_project.project_id = project.id JOIN student ON student.id = std_project.std_id join cohort ON cohort.id = project.cohort_id where project.id=$1',
    values: [id],
  };
  dbConnection.query(sql, (err, projectStudentsResults) => {
    if (err) return cb(err.DETAIL);
    return getProjectByid(id, (error, projectResult) => {
      if (error) return cb(err.DETAIL);
      const projectStudentsResult = projectStudentsResults.rows;
      return cb(null, { projectStudentsResult, projectResult });
    });
  });
};
module.exports = getStudentProjectQuery;
