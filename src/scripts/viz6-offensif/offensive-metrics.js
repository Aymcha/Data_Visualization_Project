'use strict'

import * as viz from './viz'
import * as helper from './helper'
import * as legend from './legend'


/**
 * @file This file is the entry-point for the the code of the offensive contributions of the team
 */

 export function buildBarPlots(){
  (function (d3) {

    let bounds
    bounds = d3.select('.graph').node().getBoundingClientRect()
    const margin = { top: 35, right: 100, bottom: 100, left: 50 }, // increase bottom margin for rotated labels
      width = 700,
      height = 550

    const barColors = [
      '#FAD02C',
      '#FF0000'
    ]

    const xScale = d3.scaleBand()
    const yScale = d3.scaleLinear()

    // SVG
    const svg = helper.generateSVG(width, height, margin)

    d3.csv('./Offensif.csv').then(function (data) {
      const subgroups = data.columns.slice(1)

      viz.updateXScale(xScale, data, width)
      viz.unpdateYScale(yScale, data, height)

      svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(xScale).tickSizeOuter(0))
        .selectAll("text")  // select all the text elements for the xaxis
        .attr("transform", "translate(-10,10)rotate(-45)")  // rotate the text
        .style("text-anchor", "end");

      svg.append("g")
        .call(d3.axisLeft(yScale).ticks(5));

      const color = d3.scaleOrdinal()
        .domain(subgroups)
        .range(barColors)

      viz.drawBars(data, color, xScale, yScale, svg)
    })

    legend.drawLegend()
  })(d3)
}
