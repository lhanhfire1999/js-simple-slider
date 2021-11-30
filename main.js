const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const nextBtn = $('.next-btn');
const prevBtn = $('.prev-btn');
const slideWrap = $('.slide-container');
const slides = Array.from($$('.slide-img'));
const dotsElement = $('.dots')
const slideLength = slides.length - 1;

let counter = 0;
const state = {}
Object.defineProperty(state, 'dotItems', {
  get(){
    return Array.from($$('.dot-item'));
  }
})

Object.defineProperty(state, 'sizeSlider', {
  get(){
    return $('.slider').clientWidth
  }
})

const dotHtml = slides.map((item, index) => {
  return `
    <input class="dot-item" type="radio" name="dot" id="radio-${index}" data-index="${index}"">
    <label for="radio-${index}"></label>
  `
}).join('').trim();
dotsElement.innerHTML = dotHtml;

state.dotItems.forEach(dot => {
  if(Number(dot.dataset.index) === counter) {
    dot.checked = true;
  }
  dot.onclick = function () {
    counter = Number(this.dataset.index);
    slideWrap.style.transform = 'translateX(' + (-state.sizeSlider * counter) + 'px)';
  };
})

nextBtn.onclick = () => {
  counter >= slideLength ? counter = 0 : counter++;
  slideWrap.style.transform = 'translateX(' + (-state.sizeSlider * counter) + 'px)';
  state.dotItems.forEach(dot => {
    if(Number(dot.dataset.index) === counter) {
      dot.checked = true;
    }
  })
}

prevBtn.onclick = () => {
  counter <= 0  ? counter = slideLength : counter--;
  slideWrap.style.transform = 'translateX(' + (-state.sizeSlider * counter) + 'px)';
  state.dotItems.forEach(dot => {
    if(Number(dot.dataset.index) === counter) {
      dot.checked = true;
    }
  })
}

// Auto slide 7s
setInterval(() => nextBtn.onclick(), 7000);

window.onresize = () => {
  nextBtn.onclick()
}

