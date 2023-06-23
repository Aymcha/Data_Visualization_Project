export function drawLegend(){
    const linear = d3.scaleLinear()
    .domain([0,2])
    .range(["rgb(46, 73, 123)", "rgb(71, 187, 94)"]);

    const graph = d3.select("svg");

    graph.append("g")
    .attr("class", "legendLinear")
    .attr("transform", "translate(20,20)");

    const legendLinear = d3.legendColor()
    .shapeWidth(30)
    .orient('horizontal')
    .scale(linear);

    graph.select(".legendLinear")
    .call(legendLinear);
}