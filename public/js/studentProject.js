
const addStd = document.getElementById('addStd');
const addStudent = document.getElementById('addStudent');
const selector = document.getElementById('selector');
const Url = window.location.href;
const splitUrl = Url.split('/');
const cohortId = splitUrl[splitUrl.length - 1];
const projectId = splitUrl[splitUrl.length - 4];
const deleteStudentButtons = document.querySelectorAll('.delete');
const projectType = splitUrl[splitUrl.length - 5];


let projectTypeValue = '';
if (projectType.toLowerCase() === 'clients') {
  projectTypeValue = 0;
} else if (projectType.toLowerCase() === 'community') {
  projectTypeValue = 1;
}

const toggleAddStudents = () => {
  addStd.classList.toggle('sectionAddstd--visible');
};

deleteStudentButtons.forEach((button) => {
  const deleteProjectData = { studentProject: button.id };
  const route = `/admin/${projectType}/${projectId}/projects/student/${cohortId}`;
  const routeToRedirect = `/admin/${projectType}/${projectId}/projects/student/${cohortId}`;
  deleteButtonFunction(button, route, routeToRedirect, deleteProjectData);
});


addStudent.addEventListener('click', () => {
  const studentId = selector[selector.selectedIndex].value;  
  const data = {
    studentId,
    projectId,
  };
  fetch(`/admin/${projectType}/${projectId}/projects/student/${cohortId}`, {
    method: 'POST',
    credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(data),
  })
    .then(result => result.json())
    .then((response) => {
      if(response.errorMessage) return swal('Error !', response.errorMessage, 'error');
      swal('Good job!', response.message, 'success').then((value) => {
        window.location = `/admin/${projectType}/${projectId}/projects/student/${cohortId}`;
        JSON.stringify(response);
      });
    })
    .catch(error =>  swal('Error while adding student !', error.errorMessage, 'error'));
});
