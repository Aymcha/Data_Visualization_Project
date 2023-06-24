export function drawLegend(){

    const legendData = [
        { label: "Buts", color: "blue" },
        { label: "PD (Passes décisives)", color: "red" },
        { label: "PC (Passes clès)", color: "orange" },
      ];

    const svg = d3.select('svg')



    const legend = svg.append("g")
        .attr('class', 'legend-container')
        .selectAll(".legend")
        .data(legendData)
        .enter()
        .append("g")
        .attr("class", "legend")
        .attr("transform", function(d, i) {
            return "translate(" + (200 + (i * 210)) + ", 0)";
        });

    legend.append("rect")
        .attr("x", 10) 
        .attr("y", 10)
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", function(d) {
            return d.color;
        });
    
    legend.append("text")
        .attr("x", 50) 
        .attr("y", 19) 
        .attr("dy", ".35em")
        .text(function(d) {
            return d.label;
        });

        
}