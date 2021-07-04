var title_svg = d3.select("#title_div")
    .append("svg")
    .attr("width", 1000)
    .attr("height", 200);

var title = title_svg.append("g")
    .attr("id", "title_tx_g")
    .append("text")
    .attr("class", "title")
    .attr("transform", "translate(5, 80)");

title
    .append("tspan")
    .attr("x", 550)
    .attr("y", 50)
    .text("Global Video Game Sales from 1980-2018");

var title_anm = title
    .attr("opacity", 0)
    .transition()
    .duration(1000)
    .attr("opacity", 1);
