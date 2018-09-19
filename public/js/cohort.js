const addCoh = document.getElementById('addCoh');
const addCohorts = document.getElementById('addCohort');
const names = document.getElementById('name');
const descriptions = document.getElementById('description');
const githublinks = document.getElementById('githublink');
const imgURls = document.getElementById('imgURl');
const nameerror = document.getElementById('nameerror');
const deserror = document.getElementById('deserror');
const giterror = document.getElementById('giterror');
const imgerror = document.getElementById('imgerror');
const deleteCohortsArray = document.querySelectorAll('.delete');

const addCohort = () => {
  addCoh.classList.toggle('sectionAddcoh--visible');
};

names.addEventListener('focusout', (e) => {
  check(names, nameerror, 'name Cohort is required');
});
descriptions.addEventListener('focusout', (e) => {
  check(descriptions, deserror, 'Description Cohort is required');
});
githublinks.addEventListener('focusout', (e) => {
  urlCheck(githublinks, giterror, 'Github Link Cohort is required');
});
imgURls.addEventListener('focusout', (e) => {
  urlCheck(imgURls, imgerror, 'Image Cohort is required');
});

addCohorts.addEventListener('click', (e) => {
  const checkname = check(names, nameerror, 'name Cohort is required');
  const checkDescription = check(descriptions, deserror, 'Description Cohort is required');
  const checkgitLink = urlCheck(githublinks, giterror, 'Github Link Cohort is required');
  const checkImg = urlCheck(imgURls, imgerror, 'Image Cohort is required');

  if (checkname && checkDescription && checkgitLink && checkImg) {
    const name = names.value;
    const description = descriptions.value;
    const githublink = addhttps(githublinks.value);
    const imgURl = addhttps(imgURls.value);
    const data = {
      name,
      description,
      githublink,
      imgURl,
    };
    fetch('/admin/cohorts', {
      method: 'POST',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(data),
    })
      .then(result => result.json())
      .then((response) => {
        swal('Good job!', response.message, 'success').then((value) => {
          window.location = '/admin/cohorts';
          JSON.stringify(response);
        });
      })
      .catch(error => swal(error, 'error', 'error'));
  }
});

deleteCohortsArray.forEach((button) => {
  const deleteid = button.id;
  const data = {
    deleteid,
  };
  const route = '/admin/cohorts';
  const routeToRedirect = '/admin/cohorts';
  deleteButtonFunction(button, route, routeToRedirect, data);
});
