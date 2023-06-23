/**
 * Draws a legend in the area at the bottom of the screen, corresponding to the bars' colors
 *
 * @param {string[]} data The data to be used to draw the legend elements
 * @param {*} color The color scale used throughout the visualization
 */
export function draw (data, color) {
  // TODO : Generate the legend in the div with class "legend". Each SVG rectangle
  // should have a width and height set to 15.
  // Tip : Append one div per legend element using class "legend-element".

  const legendContainer = document.querySelector('.legend')

  data.forEach((i) => {
    const legendElement = document.createElement('div')
    legendElement.classList.add('legend-element')
    const legendColor = document.createElement('div')
    legendColor.classList.add('legend-color')
    legendColor.style.backgroundColor = color(i)
    legendColor.style.width = '15px'
    legendColor.style.height = '15px'
    const legendText = document.createElement('div')
    legendText.classList.add('legend-text')
    legendText.innerHTML = i
    legendElement.appendChild(legendColor)
    legendElement.appendChild(legendText)
    legendContainer.appendChild(legendElement)
  })
}