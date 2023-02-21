// const anime = require('animejs');
import anime from 'animejs/lib/anime.es.js';

const columnsEl = document.querySelector(".columns");

for (let i = 0; i < 10; i++) {
  const curColumn = document.createElement("div");
  curColumn.textContent = i;
  curColumn.classList.add("single-column");
  columnsEl.appendChild(curColumn);
}

const columnAnimation = anime.timeline({
  targets: ".single-column",
  easing: "easeInOutSine",
  delay: anime.stagger(100),
  autoplay: false
})
.add({
  translateX: 100
})

columnAnimation.play();