const student = document.getElementById('student');
const addStd = document.getElementById('addStd');
const addPro = document.getElementById('addPro');

const students = () => {
  student.classList.toggle('sectionstd--visible');
};

const addProject = () => {
  addPro.classList.toggle('sectionAddPro--visible');
};

const addStudents = () => {
  addStd.classList.toggle('sectionAddstd--visible');
};
