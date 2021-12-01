const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const nextBtn = $('.next-btn');
const prevBtn = $('.prev-btn');
const slideWrap = $('.slide-container');
const slides = Array.from($$('.slide-img'));
const dotsElement = $('.dots')
const slideLength = slides.length - 1;

const state = {
  counter: 0,
  get dotItems(){
    return Array.from($$('.dot-item'));
  },
  get sizeSlider(){
    return $('.slider').clientWidth;
  }
}

const dotHtml = slides.map((item, index) => {
  return `
    <input class="dot-item" type="radio" name="dot" id="radio-${index}" data-index="${index}"">
    <label for="radio-${index}"></label>
  `
}).join('').trim();
dotsElement.innerHTML = dotHtml;

state.dotItems.forEach(dot => {
  if(Number(dot.dataset.index) === state.counter) {
    dot.checked = true;
  }
  dot.onclick = function () {
    state.counter = Number(this.dataset.index);
    slideWrap.style.transform = 'translateX(' + (-state.sizeSlider * state.counter) + 'px)';
  };
})

nextBtn.onclick = () => {
  state.counter >= slideLength ? state.counter = 0 : state.counter++;
  slideWrap.style.transform = 'translateX(' + (-state.sizeSlider * state.counter) + 'px)';
  state.dotItems.forEach(dot => {
    if(Number(dot.dataset.index) === state.counter) {
      dot.checked = true;
    }
  })
}

prevBtn.onclick = () => {
  state.counter <= 0  ? state.counter = slideLength : state.counter--;
  slideWrap.style.transform = 'translateX(' + (-state.sizeSlider * state.counter) + 'px)';
  state.dotItems.forEach(dot => {
    if(Number(dot.dataset.index) === state.counter) {
      dot.checked = true;
    }
  })
}

// Auto slide 7s
setInterval(() => nextBtn.onclick(), 7000);

window.onresize = () => {
  nextBtn.onclick()
}

