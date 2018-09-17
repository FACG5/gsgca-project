const addStd = document.getElementById('addStd');
const studentName = document.getElementById('studentName');
const gitHubUserName = document.getElementById('gitHubUserName');
const addStudentButton = document.getElementById('addStudentButton');
const loading = document.getElementById('loading');
const URL = window.location.href;
const splitUrl = URL.split('/');
const cohortID = splitUrl[splitUrl.length - 2];

const showAddStudentDiv = () => {
  addStd.classList.toggle('sectionAddstd--visible');
};

addStudentButton.addEventListener('click', (e) => {
  e.preventDefault();

  const studentNameValue = studentName.value;
  const gitHubUserNameValue = gitHubUserName.value;
  if (
    studentNameValue.trim() !== 0
    && gitHubUserNameValue.trim() !== 0
  ) {
    const apiLink = `https://api.github.com/users/${gitHubUserNameValue}`;
    fetch(apiLink, { method: 'GET' })
      .then((loading.style.display = 'block'))
      .then((response) => {
        loading.style.display = 'none';
        if (response.status !== 200) throw new Error('Invalid_username');
        return response.json();
      })
      .then((response) => {
        const { avatar_url: avatarUrl, html_url: htmlUrl } = response;
        const newStudent = {
          name: studentNameValue,
          username: gitHubUserNameValue,
          htmlUrl,
          avatarUrl,
          cohortID,
        };
        fetch(`/admin/cohorts/${cohortID}/newStudent`, {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify(newStudent),
        })
          .then(result => result.json())
          .then((result) => {
            if (result.err) {
              const { code } = result.err;
              const { detail } = result.err;
              if (code === '23505') return swal('Error', 'username is Exist !', 'error');
              return swal('Error', detail, 'error');
            }
            return swal(result.message, ' ', 'success').then((value) => {
              window.location = `/admin/cohorts/${cohortID}/students`;
            });
          });
      })
      .catch((err) => {
        swal('Not Valid Github Username ! ', '', 'error');
      });
  } else {
    swal('Please Enter Data ! ! ', '', 'error');
  }
});
