'use strict'

import * as helper from './scripts/viz4-performance/helper.js'
import * as viz from './scripts/viz4-performance/viz.js'
import * as legend from './scripts/viz4-performance/legend.js'
import * as hover from './scripts/viz4-performance/hover.js'
import * as d3Chromatic from 'd3-scale-chromatic'

/**
 * @file This file is the entry-point for the the code of the performance heatmap.
 */

(function (d3) {

  let bounds
  bounds = d3.select('.graph').node().getBoundingClientRect()
  const margin = { top: 35, right: 100, bottom: 35, left: 50 },
    width = 700,
    height = 550

  const barColors = [
    '#FAD02C',
    '#FF0000'
  ]

  let svgSize
  let graphSize

  const xScale = d3.scaleBand().padding(0.15)
  const yScale = d3.scaleLinear()

  

  const svg = d3.select(".graph")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

  d3.csv('./Cartons.csv').then(function (data) {
    const subgroups = data.columns.slice(1)
    const equipes = data.map(d => { return d.Equipe })

    console.log(equipes)

    const x = d3.scaleBand()
      .domain(equipes)
      .range([0, width])
      .padding([0.2])
    svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x).tickSizeOuter(0));

    const y = d3.scaleLinear()
    .domain([0, 20])
    .range([ height, 0 ]);

    svg.append("g")
    .call(d3.axisLeft(y).ticks(5));

    const color = d3.scaleOrdinal()
    .domain(subgroups)
    .range(barColors)

    const stackedData = d3.stack()
    .keys(subgroups)
    (data)

    svg.append("g")
    .selectAll("g")
    .data(stackedData)
    .enter().append("g")
      .attr("fill", function(d) { return color(d.key); })
      .selectAll("rect")
      .data(function(d) { return d; })
      .enter().append("rect")
        .attr("x", function(d) { return x(d.data.Equipe); })
        .attr("y", function(d) { return y(d[1]); })
        .attr("height", function(d) { return y(d[0]) - y(d[1]); })
        .attr("width",x.bandwidth())

  })

  
})(d3)
