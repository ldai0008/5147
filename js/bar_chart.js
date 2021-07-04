var customBarChart = (function (d3) {

  // set the dimensions and margins of the graph
  var margin = { top: 100, right: 30, bottom: 70, left: 60 },
    width = 750 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

  // append the svg object to the body of the page
  var svg = d3.select("#barContainer")
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
    .text("Top 10 publishers from 1980 to 2018");

  // Initialize the X axis
  var x = d3.scaleBand()
    .range([0, width])
    .padding(0.2);
  var xAxis = svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    

  // Initialize the Y axis
  var y = d3.scaleLinear()
    .range([height, 0]);
  var yAxis = svg.append("g")
    .attr("class", "myYaxis")


  // A function that create / update the plot for a given variable:
  var init = function () {
    initPublish();
    
    d3.select("#publishCount").on("click", function () {
      customBarChart.initPublish();
    });

    d3.select("#sales").on("click", function () {
      customBarChart.initSaleVolume();
    });

  };

  
  var initSaleVolume = function () {
    d3.csv("MyData.csv", function (error, csv_data) {
      var data = d3.nest()
        .key(function (d) {
          return d.Publisher;
        })
        .rollup(function (leaves) {
          return d3.sum(leaves, function (d) {
            if (d.Global_Sales == "") {
              return 0.0;
            } else {
              return parseFloat(d.Global_Sales);
            }
          });
        }).entries(csv_data)
        .map(function (d) {
          return { publisher: d.key, sale: d.value };
        });

      data.sort(function (x, y) {
        return d3.descending(x.sale, y.sale);
      });

      data = data.filter(function (d, i) {
        return i < 10;
      });


      x.domain(data.map(function (d) { return d.publisher; }))
      xAxis.transition().duration(500).call(d3.axisBottom(x))
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", "-.55em")
      .attr("transform", "rotate(-90)" );

      // Add Y axis
      // y.domain([0, d3.max(data, function(d) { return d.count }) ]);
      y.domain([0, d3.max(data, function (d) { return d.sale })]);
      yAxis.transition().duration(500).call(d3.axisLeft(y));

      // variable u: map data to existing bars
      // var u = svg.selectAll("rect")
      //   .data(data)
      var u = svg.selectAll("rect")
      u.remove()
      u = svg.selectAll("rect")
        .data(data)

      // update bars
      u
        .enter()
        .append("rect")
        .merge(u)
        .transition()
        .duration(1000)
        .attr("x", function (d) { return x(d.publisher); })
        .attr("y", function (d) { return y(d.sale); })
        .attr("width", x.bandwidth())
        .attr("height", function (d) { return height - y(d.sale); })
        .attr("fill", "#69b3a2")

      //text labels on bars
			u
        .enter()
				.append("text")
				.text(function(d) {
					return parseInt(d.sale);
				})
				.attr("x", function(d){
					return x(d.publisher) + x.bandwidth() / 2;
				})
				.attr("y", function(d){
					return y(d.sale) + 14;
				})
				.attr("font-family" , "sans-serif")
				.attr("font-size" , "11px")
				.attr("fill" , "white")
				.attr("text-anchor", "middle");

    });
  };

  var initPublish = function () {
    d3.csv("MyData.csv", function (data) {

      // define count object that holds count for each publisher
      var countObj = {};
      var arrayCount = [];

      // count how much each publisher occurs in list and store in countObj
      data.forEach(function (d) {
        var publisher = d.Publisher;
        if (countObj[publisher] === undefined) {
          countObj[publisher] = 0;
        } else {
          countObj[publisher] = countObj[publisher] + 1;
        }
      });

      // now store the count in each data member
      data.forEach(function (d) {
        var publisher = d.Publisher;
        d.count = countObj[publisher];
      });

      // build arrayCount
      for (var val in countObj) {
        var subObj = {};
        subObj.Publisher = val;
        subObj.count = countObj[val];
        arrayCount.push(subObj);
      }

      arrayCount.sort(function (x, y) {
        return d3.descending(x.count, y.count);
      });

      arrayCount = arrayCount.filter(function (d, i) {
        return i < 10;
      });

      // X axis
      x.domain(arrayCount.map(function (d) { return d.Publisher; }))
      xAxis.transition().duration(500).call(d3.axisBottom(x))
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", "-.55em")
      .attr("transform", "rotate(-90)" );

      // Add Y axis
      y.domain([0, d3.max(arrayCount, function (d) { return d.count })]);
      yAxis.transition().duration(500).call(d3.axisLeft(y));

      // variable u: map data to existing bars
      // var u = svg.selectAll("rect")
      //   .data(data)
      var u = svg.selectAll("rect")
      u.remove()
      u = svg.selectAll("rect")
        .data(arrayCount)

      // update bars
      u
        .enter()
        .append("rect")
        .merge(u)
        .transition()
        .duration(1000)
        .attr("x", function (d) { return x(d.Publisher); })
        .attr("y", function (d) { return y(d.count); })
        .attr("width", x.bandwidth())
        .attr("height", function (d) { return height - y(d.count); })
        .attr("fill", "#69b3a2")
        .attr("text-anchor", "middle");
      

      //text labels on bars
			u
				.enter()
				.append("text")
				.text(function(d) {
					return d.count;
				})
				.attr("x", function(d){
					return x(d.Publisher) + x.bandwidth() / 2;
				})
				.attr("y", function(d){
					return y(d.count) + 14;
				})
				.attr("font-family" , "sans-serif")
				.attr("font-size" , "11px")
				.attr("fill" , "white")
				.attr("text-anchor", "middle");
    });
  };

  var returnObj = {
    init: init,
    initPublish: initPublish,
    initSaleVolume: initSaleVolume
  };
  
  return returnObj;
  
})(d3);