const name = document.getElementById('name');
const webLink = document.getElementById('webLink');
const gitLink = document.getElementById('gitLink');
const imgUrl = document.getElementById('imgUrl');
const description = document.getElementById('description');
const editProjrojectButton = document.getElementById('editProj');
const nameError = document.getElementById('nameError');
const descriptionError = document.getElementById('descriptionError');
const gitError = document.getElementById('gitError');
const webError = document.getElementById('webError');
const imgError = document.getElementById('imgError');
const URL = window.location.href;
const splitUrl = URL.split('/');
const cohortId = splitUrl[splitUrl.length - 3];
const projectId = splitUrl[splitUrl.length - 1];
const projectType = splitUrl[splitUrl.length - 4];
let projectTypeValue = '';
if (projectType.toLowerCase() === 'clients') {
  projectTypeValue = 0;
} else if (projectType.toLowerCase() === 'community') {
  projectTypeValue = 1;
}


name.addEventListener('focusout', (e) => {
  check(name, nameError, 'name is required');
});
webLink.addEventListener('focusout', (e) => {
  urlCheck(webLink, webError, 'Web Link is required');
});
gitLink.addEventListener('focusout', (e) => {
  urlCheck(gitLink, gitError, 'Github Link is required');
});
description.addEventListener('focusout', (e) => {
  check(description, descriptionError, 'Description is required');
});
imgUrl.addEventListener('focusout', (e) => {
  urlCheck(imgUrl, imgError, 'Image url is required');
});

editProjrojectButton.addEventListener('click', (e) => {
  e.preventDefault();
  const checkName = check(name, nameError, 'name is required');
  const checkDescription = check(description, descriptionError, 'Description is required');
  const checkGitLink = urlCheck(gitLink, gitError, 'Github Link is required');
  const checkWebLink = urlCheck(webLink, webError, 'Web Link is required');
  const checkImage = urlCheck(imgUrl, imgError, 'Image url is required');
  if (checkName && checkDescription && checkGitLink && checkWebLink && checkImage) {
    const nameVal = name.value;
    const descriptionVal = description.value;
    const webLinkVal = webLink.value;
    const gitLinkVal = gitLink.value;
    const imgUrlVal = imgUrl.value;

    const newProject = {
      nameVal,
      descriptionVal,
      webLinkVal,
      gitLinkVal,
      imgUrlVal,
      cohortId,
      projectId,
      projectTypeValue,
    };

    fetch(`/admin/community/${cohortId}/edit/${projectId}`, {
      method: 'POST',
      credentials: 'same-origin',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(newProject),
    })
      .then((response) => { response.json(); })
      .then((response) => {
        swal('Good job!', 'Edited Successfully!', 'success').then((value) => {
          window.location = `/admin/community/${cohortId}/projects`;
          JSON.stringify(response);
        });
      })
      .catch(error => swal(error, 'error', 'error'));
  }
});
