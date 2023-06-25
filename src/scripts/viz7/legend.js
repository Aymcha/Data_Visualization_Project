export function drawLegend () {
  const legendData = [
    { label: 'Buts', color: '#007AFF' },
    { label: 'Tirs', color: '#FF2E2E' }
  ]

  const svg = d3.select('.viz7-svg')

  const legend = svg.append('g')
    .attr('class', 'legend-container')
    .selectAll('.legend')
    .data(legendData)
    .enter()
    .append('g')
    .attr('class', 'legend')
    .attr('transform', function (d, i) {
      return 'translate(' + (275 + (i * 150)) + ', 0)'
    })

  legend.append('rect')
    .attr('x', 10)
    .attr('y', 10)
    .attr('width', 18)
    .attr('height', 18)
    .style('fill', function (d) {
      return d.color
    })

  legend.append('text')
    .attr('x', 40)
    .attr('y', 19)
    .attr('dy', '.35em')
    .text(function (d) {
      return d.label
    })
}