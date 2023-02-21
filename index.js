// const anime = require('animejs');
import anime from 'animejs/lib/anime.es.js';
import * as d3 from "d3";

const column_name = [];
const data = {};
const columnsEl = document.querySelector(".columns");

d3.csv("/data/Sample.csv", (d) => {
  if (column_name.length === 0) {
    for (const [key, value] of Object.entries(d)) {
      column_name.push(key);
      data[key] = [];
      const curColumn = document.createElement("div");
      curColumn.textContent = key;
      curColumn.classList.add("single-column");
      columnsEl.appendChild(curColumn);
    }
  }
  for (const [key, value] of Object.entries(d)) {
    data[key].push(value);
  }
})

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