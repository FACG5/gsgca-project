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

name.addEventListener('focusout', checkName);
description.addEventListener('focusout', checkDescription);
gitLink.addEventListener('focusout', checkGitLink);
webLink.addEventListener('focusout', checkWebLink);
imgUrl.addEventListener('focusout', checkImage);

editProjrojectButton.addEventListener('click', (e) => {
  e.preventDefault();
  if (checkName() && checkDescription() && checkGitLink() && checkWebLink() && checkImage()) {
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
    };

    fetch(`/admin/community/${cohortId}/edit/${projectId}`, {
      method: 'POST',
      credentials: 'same-origin',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(newProject),
    })
      .then((response) => { response.json(); })
      .then((response) => {
        swal('Good job!', 'Add Successfully!', 'success').then((value) => {
          window.location = `/admin/community/${cohortId}/projects`;
          JSON.stringify(response);
        });
      })
      .catch(error => swal(error, 'error', 'error'));
  }
});
