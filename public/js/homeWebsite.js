let slideIndex = 0;

const plusDivs = (n) => {
  showDivs((slideIndex += n));
};

const currentDiv = (n) => {
  showDivs((slideIndex = n));
};

const showDivs = (n) => {
  let i;
  const x = document.getElementsByClassName('mySlides');
  const dots = document.getElementsByClassName('demo');
  if (n > x.length) {
    slideIndex = 1;
  }

  if (n < 1) {
    slideIndex = x.length;
  }
  for (i = 0; i < x.length; i++) {
    x[i].style.display = 'none';
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(' w3-white', '');
  }
  x[slideIndex - 1].style.display = 'block';

  dots[slideIndex - 1].className += ' w3-white';
};

setInterval(() => {
  showDivs((slideIndex += 1));
}, 6000);

showDivs(slideIndex);
