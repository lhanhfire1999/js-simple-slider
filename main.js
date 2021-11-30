const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const nextBtn = $('.next-btn');
const prevBtn = $('.prev-btn');
const slideWrap = $('.slide-container');
const slides = Array.from($$('.slide-img'));
const dotsElement = $('.dots')
let dotList = null;

const size = $('.slider').offsetWidth;
const slideLength = slides.length - 1;

let counter = 0;

const dotHtml = slides.map((item, index) => {
  return `
    <input class="dot-item" type="radio" name="dot" id="radio-${index}" data-index="${index}"">
    <label for="radio-${index}"></label>
  `
}).join('').trim();

dotsElement.innerHTML = dotHtml;
dotList = Array.from($$('.dot-item'));

dotList.forEach(dot => {
  if(Number(dot.dataset.index) === counter) {
    dot.checked = true;
  }
  dot.onclick = function () {
    counter = Number(this.dataset.index);
    slideWrap.style.transform = 'translateX(' + (-size * counter) + 'px)';
  };
})

nextBtn.onclick = () => {
  counter >= slideLength ? counter = 0 : counter++;
  slideWrap.style.transform = 'translateX(' + (-size * counter) + 'px)';
  dotList.forEach(dot => {
    if(Number(dot.dataset.index) === counter) {
      dot.checked = true;
    }
  })
}

prevBtn.onclick = () => {
  counter <= 0  ? counter = slideLength : counter--;
  slideWrap.style.transform = 'translateX(' + (-size * counter) + 'px)';
  dotList.forEach(dot => {
    if(Number(dot.dataset.index) === counter) {
      dot.checked = true;
    }
  })
}

// Auto slide 5s
setInterval(() => nextBtn.onclick(), 7000);




