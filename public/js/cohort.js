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

const addCohort = () => {
  addCoh.classList.toggle('sectionAddcoh--visible');
};

const displayErr = (errElem, errMsg) => {
  errElem.textContent = errMsg;
};

const checkNam = () => {
  if (names.value === '') {
    displayErr(nameerror, 'name Cohort is required');
  } else {
    displayErr(nameerror, '');
    return true;
  }
};

const checkdes = () => {
  if (descriptions.value === '') {
    displayErr(deserror, 'Description Cohort is required');
  } else {
    displayErr(deserror, '');
    return true;
  }
};

const checkgit = () => {
  if (githublinks.value === '') {
    displayErr(giterror, 'Github Link Cohort is required');
  } else {
    displayErr(giterror, '');
    return true;
  }
};

const checkimg = () => {
  if (imgURls.value === '') {
    displayErr(imgerror, 'Image Cohort is required');
  } else {
    displayErr(imgerror, '');
    return true;
  }
};

names.addEventListener('focusout', checkNam);
descriptions.addEventListener('focusout', checkdes);
githublinks.addEventListener('focusout', checkgit);
imgURls.addEventListener('focusout', checkimg);

addCohorts.addEventListener('click', (e) => {
  if (checkNam() && checkdes() && checkgit() && checkimg()) {
    const name = names.value;
    const description = descriptions.value;
    const githublink = githublinks.value;
    const imgURl = imgURls.value;
    const data = {
      name, description, githublink, imgURl,
    };
    fetch('/admin/cohorts', {
      method: 'POST',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(data),
    })
      .then((response) => { response.json(); })
      .then((response) => {
        swal('Good job!', 'Add Successfully!', 'success').then((value) => {
          window.location = '/admin/cohorts';
          JSON.stringify(response);
        });
      })
      .catch(error => swal(error, 'error', 'error'));
  }
});
