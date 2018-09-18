const express = require('express');

const home = require('./webSiteHome');
const cohortWebsite = require('./cohortWebsite');
const clientProjectsWebsite = require('./clientWebsite');
const communityProjectsWebsite = require('./communityWebsite');
const projectPageWebsite = require('./projectPageWebsite');
const cohortPageWebsite = require('./cohortPageWebsite');
const login = require('./login');
const error = require('./error');
const adminHomePage = require('./adminHomePage');
const cohorts = require('./cohorts');
const editcohort = require('./editCohort');
const students = require('./Students');
const { authCheck } = require('./middleware');

const router = express.Router();

router.get('/', home.get);
router.get('/cohort', cohortWebsite.get);
router.get('/clientProjects', clientProjectsWebsite.get);
router.get('/communityProjects', communityProjectsWebsite.get);
router.get('/projects/id', projectPageWebsite.get);
router.get('/cohortPageWebsite/id', cohortPageWebsite.get);

router.get('/admin/login', login.get);
router.post('/admin/login', login.post);

router.get('/admin', authCheck, adminHomePage.get);
router.get('/admin/logout', authCheck, adminHomePage.logout);
router.get('/admin/cohorts', authCheck, cohorts.get);
router.post('/admin/cohorts', authCheck, cohorts.addCohort);
router.delete('/admin/cohorts', authCheck, cohorts.deleteCohort);
router.get('/admin/cohorts/edit/:id', authCheck, editcohort.getCohortData);
router.post('/admin/cohorts/edit/:id', authCheck, editcohort.editCohort);
router.post('/admin/cohorts/:cohortId/newStudent', authCheck, students.post);
router.get('/admin/cohorts/:cohortId/students', authCheck, cohorts.getStudents);
router.post('/admin/cohorts/:cohortId/newStudent', authCheck, students.post);
router.delete('/admin/cohorts/:cohortId/deleteStudent', authCheck, students.delete);

router.use(error.client);
router.use(error.server);

module.exports = router;
