(function (d3, _) {
  // set the dimensions and margins of the graph
  var margin = { top: 30, right: 30, bottom: 30, left: 60 },
    width = 750 - margin.left - margin.right,
    height = 460 - margin.top - margin.bottom;

  // append the svg object to the body of the page
  // append the svg object to the body of the page
  var svg = d3.select("#lineContainer")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
      "translate(" + margin.left + "," + margin.top + ")");


  svg.append("text")
.attr("x", (width / 2))             
.attr("y", 0 - (margin.top / 2))
.attr("text-anchor", "middle")  
.style("font-size", "16px") 
.style("text-decoration", "underline")  
.text("Sales in different regions from 1980 to 2018");

var data;
var line;
var x;
var y;
var myColor;

  //Read the data
  d3.csv("MyData.csv",
    function (error, csv_data) {

      data = d3.nest()
        .key(function (d) { return d.Year; })
        .rollup(function (leaves) {
          return {
            NA_Sales: d3.sum(leaves, function (e) { return parseFloat(e["NA_Sales"]); }),
            EU_Sales: d3.sum(leaves, function (e) { return parseFloat(e["EU_Sales"]); }),
            JP_Sales: d3.sum(leaves, function (e) { return parseFloat(e["JP_Sales"]); }),
          };
        }).entries(csv_data)

      data.sort(function (x, y) {
        return d3.ascending(x.key, y.key);
      })

      // console.log(data)
      // List of groups (here I have one group per column)
      var allGroup = ["NA_Sales", "EU_Sales", "JP_Sales"]

      // add the options to the button
      d3.select("#selectButton")
        .selectAll('myOptions')
        .data(allGroup)
        .enter()
        .append('option')
        .text(function (d) { return d; }) // text showed in the menu
        .attr("value", function (d) { return d; }) // corresponding value returned by the button

      // A color scale: one color for each group
      myColor = d3.scaleOrdinal()
        .domain(allGroup)
        .range(d3.schemeSet2);

      // Add X axis --> it is a date format
      x = d3.scaleLinear()
        .domain(d3.extent(data, function (d) { return d.key; }))
        .range([0, width]);
      svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

      // Add Y axis
      y = d3.scaleLinear()
        .domain([0, 400])
        .range([height, 0]);
      svg.append("g")
        .call(d3.axisLeft(y));

      // Initialize line with group a
      line = svg
        .append('g')
        .append("path")
        .datum(data)
        .attr("d", d3.line()
          .x(function (d) { return x(+d.key) })
          .y(function (d) { return y(+d.value.NA_Sales) })
        )
        .attr("stroke", function (d) { return myColor("NA_Sales") })
        .style("stroke-width", 4)
        .style("fill", "none")

      // When the button is changed, run the updateChart function
      d3.select("#selectButton").on("change", function (d) {
        // recover the option that has been chosen
        var selectedOption = d3.select(this).property("value")
        // run the updateChart function with this selected option
        customLineChart.updateLine(selectedOption);
      })

    })

    // A function that update the chart
    function updateLine(selectedGroup) {

      // Create new data with the selection?
      var dataFilter = data.map(function (d) { return { key: d.key, value: d.value[selectedGroup] } })

      // Give these new data to update line
      line
        .datum(dataFilter)
        .transition()
        .duration(1000)
        .attr("d", d3.line()
          .x(function (d) { return x(+d.key) })
          .y(function (d) { return y(+d.value) })
        )
        .attr("stroke", function (d) { return myColor(selectedGroup) })
    }

  // var returnObj = {
  //   updateLine: updateLine
  // };
  
  // return returnObj;
    // return {
    //   updateLine: updateLine
    // }

    if (typeof _.customLineChart === "undefined") {
      _.customLineChart = {
      }
    }

    _.customLineChart.updateLine = updateLine;

})(d3, window);