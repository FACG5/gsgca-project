const header = document.getElementById('myHeader');
const sticky = header.offsetTop;

window.onscroll = function () {
  myFunctionscroll();
};

const myFunctionscroll= () => {
  if (window.pageYOffset > sticky) {
    header.classList.add('sticky');
  } else {
    header.classList.remove('sticky');
  }
};

const myFunction = () => {
  const y = document.getElementById('topnavUL');
  if (y.style.display === 'none') {
    y.style.display = 'grid';
  } else {
    y.style.display = 'none';
  }
};
