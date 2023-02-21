import anime from 'animejs/lib/anime.es.js';
import * as d3 from "d3";

const column_name = [];
const data = {};
const columnsEl = document.querySelector(".columns");

// https://d3-graph-gallery.com/graph/barplot_basic.html
const displayViz = (data_input, columnSelect) => {
  // apple, orange, watermelon
  const categories = [];
  let maxRange = 0;

  const dataValueForm = [];

  for (const [key, value] of Object.entries(data_input[columnSelect])) {
    categories.push(key);
    maxRange = Math.max(maxRange, value);
    dataValueForm.push({
      "data": key,
      "value": value
    })
  }

  let margin = {top: 30, right: 30, bottom: 70, left: 60},
    width = 500 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

  let svg = d3.select("#data-viz")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

  var x = d3.scaleBand()
    .range([ 0, width ])
    .domain(categories)
    .padding(0.2);

  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

  var y = d3.scaleLinear()
    .domain([0, maxRange])
    .range([ height, 0]);

  svg.append("g")
    .call(d3.axisLeft(y));

  svg.selectAll("rect")
    .data(dataValueForm)
    .enter()
    .append("rect")
      .attr("x", function(d) {
        return x(d["data"]);
      })
      .attr("y", function(d) { return y(d["value"]); })
      .attr("width", x.bandwidth())
      .attr("height", function(d) { return height - y(d["value"]); })
      .attr("fill", "#69b3a2")
}

d3.csv("https://raw.githubusercontent.com/vincentvzz/my_data/main/Sample.csv", (d) => {
  if (column_name.length === 0) {
    for (const [key, value] of Object.entries(d)) {
      column_name.push(key);
      data[key] = {};
      const curColumn = document.createElement("div");
      curColumn.textContent = key;
      curColumn.classList.add("single-column");
      curColumn.addEventListener("click", (e) => {
        let dataVizEl = document.querySelector("#data-viz");
        if (dataVizEl.hasChildNodes()) {
          dataVizEl.removeChild(document.querySelector("svg"));
        }
        let selectedColumn = e.target.textContent;
        displayViz(data, selectedColumn);
      })
      columnsEl.appendChild(curColumn);
    }
  }
  for (const [key, value] of Object.entries(d)) {
    if (!data[key][value]) {
      data[key][value] = 0;
    }
    data[key][value] = data[key][value] + 1;
  }
  const columnAnimation = anime.timeline({
    targets: ".single-column",
    easing: "easeInOutSine",
    delay: anime.stagger(100),
    autoplay: false
  })
  .add({
    translateY: 100
  })
  columnAnimation.play();
})