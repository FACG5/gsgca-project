const studentName = document.getElementById('studentName');
const gitHubUserName = document.getElementById('gitHubUserName');
const addStudentButton = document.getElementById('addStudentButton');
const loading = document.getElementById('loading');
const URL = window.location.href;
const splitUrl = URL.split('/');
const cohortID = splitUrl[splitUrl.length - 2];
const deleteStudentButton = document.querySelectorAll('.delete');


function addStudents() {
  addStd.classList.toggle('sectionAddstd--visible');
}

addStudentButton.addEventListener('click', (e) => {
  e.preventDefault();

  const studentNameValue = studentName.value;
  const gitHubUserNameValue = gitHubUserName.value;
  if (
    studentNameValue.trim().length !== 0 &&
    gitHubUserNameValue.trim().length !== 0
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
        const { avatar_url } = response;
        const { html_url } = response;
        const newStudent = {
          name: studentNameValue,
          username: gitHubUserNameValue,
          avatar_url,
          html_url,
          cohortID,
        };
        fetch('/admin/newStudent', {
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
      .catch(blah => {
        return swal('Not Valid Github Username ! ', '', 'error');
      })
        

  } else {
    swal('Please Enter Data ! ! ', '', 'error');
  }
});
deleteStudentButton.forEach((element) => {
  element.addEventListener('click', (e) => {
    e.preventDefault();
    swal({ 
      title: 'Are you sure ?',
      text: 'Once deleted, you will not be able to recover this imaginary file!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          const deleteStudentData = {stdId: element.id, cohortID };
          fetch('/admin/deleteStudent', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(deleteStudentData),
          }).then(result => result.json())
            .then((result) => {
              if (result.err) return swal('Error', '', 'error');
              return swal(result.message, {
                icon: 'success',
              }).then((value) => { window.location = `/admin/cohorts/${cohortID}/students`; });
            });
        } else {
          swal('Student is safe !');
        }
      });
  });
});
