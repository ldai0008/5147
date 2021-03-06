var width = 800,
			height = 650,
			radius = Math.min(width, height) / 2;

	var x = d3.scale.linear()
			.range([0, 2 * Math.PI]);

	var y = d3.scale.linear()
			.range([0, radius]);

	var color = d3.scale.category20c();

	var svg = d3.select("#sunContainer").append("svg")
			.attr("width", width)
			.attr("height", height)
			.append("g")
			.attr("transform", "translate(" + width / 2 + "," + (height / 2 + 10) + ")");

	var partition = d3.layout.partition()
			.value(function(d) {
				return d.size;
			});

	var arc = d3.svg.arc()
			.startAngle(function(d) {
				return Math.max(0, Math.min(2 * Math.PI, x(d.x)));
			})
			.endAngle(function(d) {
				return Math.max(0, Math.min(2 * Math.PI, x(d.x + d.dx)));
			})
			.innerRadius(function(d) {
				return Math.max(0, y(d.y));
			})
			.outerRadius(function(d) {
				return Math.max(0, y(d.y + d.dy));
			});


	var g = svg.selectAll("g")
			.data(partition.nodes(getData()))
			.enter().append("g");

	var path = g.append("path")
			.attr("d", arc)
			.style("fill", function(d) {
				return color((d.children ? d : d.parent).name);
			})
			.on("click", click);

	var text = g.append("text")
			.attr("transform", function(d) {
				return "rotate(" + computeTextRotation(d) + ")";
			})
			.attr("x", function(d) {
				return y(d.y);
			})
			.attr("dx", "6") // margin
			.attr("dy", ".35em") // vertical-align
			.text(function(d) {
				return d.name;
			});

	

	function click(d) {
		// fade out all text elements
		text.transition().attr("opacity", 0);

		path.transition()
				.duration(750)
				.attrTween("d", arcTween(d))
				.each("end", function(e, i) {
					// check if the animated element's data e lies within the visible angle span given in d
					if (e.x >= d.x && e.x < (d.x + d.dx)) {
						// get a selection of the associated text element
						var arcText = d3.select(this.parentNode).select("text");
						// fade in the text element and recalculate positions
						arcText.transition().duration(750)
								.attr("opacity", 1)
								.attr("transform", function() {
									return "rotate(" + computeTextRotation(e) + ")"
								})
								.attr("x", function(d) {
									return y(d.y);
								});
					}
				});
	}

	d3.select(self.frameElement).style("height", height + "px");

	// Interpolate the scales!
	function arcTween(d) {
		var xd = d3.interpolate(x.domain(), [d.x, d.x + d.dx]),
				yd = d3.interpolate(y.domain(), [d.y, 1]),
				yr = d3.interpolate(y.range(), [d.y ? 20 : 0, radius]);
		return function(d, i) {
			return i ? function(t) {
				return arc(d);
			} : function(t) {
				x.domain(xd(t));
				y.domain(yd(t)).range(yr(t));
				return arc(d);
			};
		};
	}

	function computeTextRotation(d) {
		return (x(d.x + d.dx / 2) - Math.PI / 2) / Math.PI * 180;
	}

	function getData() {
		return {
			"name": "flare",
			"children": [{
				"name": "Year",
				"children": [{
					"name": "1980",
					"children": [{
						"name": "Action",
						"size": 1
					}, {
						"name": "Fighting",
						"size": 2
					}, {
						"name": "Misc",
						"size": 4
					}, {
						"name": "Racing",
						"size": 1
					}, {
						"name": "Shooter",
						"size": 2
					}, {
						"name": "Sports",
						"size": 2
					}]
				}, {
					"name": "1981",
					"children": [{
						"name": "Action",
						"size": 25
					}, {
						"name": "Platform",
						"size": 3
					}, {
						"name": "Puzzle",
						"size": 2
					}, {
						"name": "Racing",
						"size": 1
					}, {
						"name": "Shooter",
						"size": 10
					}, {
						"name": "Sports",
						"size": 2
					}, {
						"name": "Simulation",
						"size": 1
					}]
				}, {
					"name": "1982",
					"children": [{
						"name": "Action",
						"size": 18
					}, {
						"name": "Platform",
						"size": 5
					}, {
						"name": "Puzzle",
						"size": 3
					}, {
						"name": "Racing",
						"size": 2
					}, {
						"name": "Shooter",
						"size": 5
					}, {
						"name": "Sports",
						"size": 2
					}, {
						"name": "Misc",
						"size": 1
					}]
				},{
					"name": "1983",
					"children": [{
						"name": "Action",
						"size": 7
					}, {
						"name": "Platform",
						"size": 5
					}, {
						"name": "Puzzle",
						"size": 1
					}, {
						"name": "Adventure",
						"size": 1
					}, {
						"name": "Shooter",
						"size": 1
					}, {
						"name": "Sports",
						"size": 1
					}, {
						"name": "Misc",
						"size": 1
					}]
				},{
					"name": "1984",
					"children": [{
						"name": "Action",
						"size": 1
					}, {
						"name": "Platform",
						"size": 1
					}, {
						"name": "Puzzle",
						"size": 3
					}, {
						"name": "Racing",
						"size": 3
					}, {
						"name": "Shooter",
						"size": 3
					}, {
						"name": "Sports",
						"size": 2
					}, {
						"name": "Misc",
						"size": 1
					}]
				},{
					"name": "1985",
					"children": [{
						"name": "Action",
						"size": 2
					}, {
						"name": "Fighting",
						"size": 1
					}, {
						"name": "Platform",
						"size": 4
					}, {
						"name": "Puzzle",
						"size": 4
					},  {
						"name": "Shooter",
						"size": 1
					}, {
						"name": "Simulation",
						"size": 1
					}, {
						"name": "Sports",
						"size": 1
					}]
				},{
					"name": "1986",
					"children": [{
						"name": "Action",
						"size": 6
					}, {
						"name": "Platform",
						"size": 6
					}, {
						"name": "Racing",
						"size": 1
					}, {
						"name": "Shooter",
						"size": 4
					}, {
						"name": "Sports",
						"size": 3
					}, {
						"name": "Role-Playing",
						"size": 1
					}]
				},{
					"name": "1984",
					"children": [{
						"name": "Action",
						"size": 2
					}, {
						"name": "Adventure",
						"size": 1
					}, {
						"name": "Fighting",
						"size": 2
					}, {
						"name": "Platform",
						"size": 2
					}, {
						"name": "Shooter",
						"size": 2
					}, {
						"name": "Sports",
						"size": 4
					}, {
						"name": "Role-Playing",
						"size": 3
					}]
				},{
					"name": "1988",
					"children": [{
						"name": "Action",
						"size": 1
					}, {
						"name": "Platform",
						"size": 4
					}, {
						"name": "Puzzle",
						"size": 1
					}, {
						"name": "Racing",
						"size": 1
					}, {
						"name": "Role-Playing",
						"size": 3
					}, {
						"name": "Shooter",
						"size": 1
					}, {
						"name": "Simulation",
						"size": 1
					}, {
						"name": "Sports",
						"size": 2
					}]
				},{
					"name": "1989",
					"children": [{
						"name": "Action",
						"size": 2
					}, {
						"name": "Platform",
						"size": 3
					}, {
						"name": "Puzzle",
						"size": 5
					}, {
						"name": "Role-Playing",
						"size": 2
					}, {
						"name": "Shooter",
						"size": 1
					}, {
						"name": "Sports",
						"size": 3
					}, {
						"name": "Misc",
						"size": 1
					}]
				},{
					"name": "1990",
					"children": [{
						"name": "Action",
						"size": 3
					}, {
						"name": "Platform",
						"size": 3
					}, {
						"name": "Puzzle",
						"size": 2
					}, {
						"name": "Racing",
						"size": 2
					}, {
						"name": "Role-Playing",
						"size": 2
					}, {
						"name": "Sports",
						"size": 3
					}, {
						"name": "Simulation",
						"size": 1
					}]
				},{
					"name": "1991",
					"children": [{
						"name": "Action",
						"size": 5
					}, {
						"name": "Adventure",
						"size": 2
					}, {
						"name": "Fighting",
						"size": 1
					}, {
						"name": "Misc",
						"size": 1
					}, {
						"name": "Platform",
						"size": 6
					}, {
						"name": "Puzzle",
						"size": 4
					}, {
						"name": "Racing",
						"size": 1
					}, {
						"name": "Role-Playing",
						"size": 5
					}, {
						"name": "Shooter",
						"size": 3
					}, {
						"name": "Simulation",
						"size": 2
					}, {
						"name": "Sports",
						"size": 7
					}, {
						"name": "Strategy",
						"size": 4
					}]
				},{
					"name": "1992",
					"children": [{
						"name": "Action",
						"size": 1
					}, {
						"name": "Adventure",
						"size": 4
					}, {
						"name": "Fighting",
						"size": 7
					}, {
						"name": "Misc",
						"size": 2
					}, {
						"name": "Platform",
						"size": 6
					}, {
						"name": "Puzzle",
						"size": 5
					}, {
						"name": "Racing",
						"size": 2
					}, {
						"name": "Role-Playing",
						"size": 5
					}, {
						"name": "Shooter",
						"size": 3
					}, {
						"name": "Simulation",
						"size": 1
					}, {
						"name": "Sports",
						"size": 4
					}, {
						"name": "Strategy",
						"size": 3
					}]
				},{
					"name": "1993",
					"children": [{
						"name": "Action",
						"size": 6
					}, {
						"name": "Adventure",
						"size": 1
					}, {
						"name": "Fighting",
						"size": 11
					}, {
						"name": "Misc",
						"size": 3
					}, {
						"name": "Platform",
						"size": 11
					}, {
						"name": "Puzzle",
						"size": 3
					}, {
						"name": "Racing",
						"size": 2
					}, {
						"name": "Role-Playing",
						"size": 9
					}, {
						"name": "Shooter",
						"size": 2
					}, {
						"name": "Simulation",
						"size": 1
					}, {
						"name": "Sports",
						"size": 9
					}, {
						"name": "Strategy",
						"size": 2
					}]
				},{
					"name": "1994",
					"children": [{
						"name": "Action",
						"size": 4
					}, {
						"name": "Adventure",
						"size": 4
					}, {
						"name": "Fighting",
						"size": 22
					}, {
						"name": "Misc",
						"size": 6
					}, {
						"name": "Platform",
						"size": 11
					}, {
						"name": "Puzzle",
						"size": 3
					}, {
						"name": "Racing",
						"size": 8
					}, {
						"name": "Role-Playing",
						"size": 17
					}, {
						"name": "Shooter",
						"size": 11
					}, {
						"name": "Simulation",
						"size": 7
					}, {
						"name": "Sports",
						"size": 22
					}, {
						"name": "Strategy",
						"size": 6
					}]
				},{
					"name": "1995",
					"children": [{
						"name": "Action",
						"size": 8
					}, {
						"name": "Adventure",
						"size": 13
					}, {
						"name": "Fighting",
						"size": 29
					}, {
						"name": "Misc",
						"size": 22
					}, {
						"name": "Platform",
						"size": 13
					}, {
						"name": "Puzzle",
						"size": 12
					}, {
						"name": "Racing",
						"size": 12
					}, {
						"name": "Role-Playing",
						"size": 24
					}, {
						"name": "Shooter",
						"size": 29
					}, {
						"name": "Simulation",
						"size": 14
					}, {
						"name": "Sports",
						"size": 29
					}, {
						"name": "Strategy",
						"size": 14
					}]
				},{
					"name": "1996",
					"children": [{
						"name": "Action",
						"size": 20
					}, {
						"name": "Adventure",
						"size": 17
					}, {
						"name": "Fighting",
						"size": 30
					}, {
						"name": "Misc",
						"size": 23
					}, {
						"name": "Platform",
						"size": 14
					}, {
						"name": "Puzzle",
						"size": 9
					}, {
						"name": "Racing",
						"size": 22
					}, {
						"name": "Role-Playing",
						"size": 28
					}, {
						"name": "Shooter",
						"size": 23
					}, {
						"name": "Simulation",
						"size": 13
					}, {
						"name": "Sports",
						"size": 52
					}, {
						"name": "Strategy",
						"size": 12
					}]
				},{
					"name": "1997",
					"children": [{
						"name": "Action",
						"size": 31
					}, {
						"name": "Adventure",
						"size": 14
					}, {
						"name": "Fighting",
						"size": 28
					}, {
						"name": "Misc",
						"size": 12
					}, {
						"name": "Platform",
						"size": 19
					}, {
						"name": "Puzzle",
						"size": 14
					}, {
						"name": "Racing",
						"size": 36
					}, {
						"name": "Role-Playing",
						"size": 23
					}, {
						"name": "Shooter",
						"size": 27
					}, {
						"name": "Simulation",
						"size": 19
					}, {
						"name": "Sports",
						"size": 46
					}, {
						"name": "Strategy",
						"size": 21
					}]
				},{
					"name": "1998",
					"children": [{
						"name": "Action",
						"size": 44
					}, {
						"name": "Adventure",
						"size": 23
					}, {
						"name": "Fighting",
						"size": 41
					}, {
						"name": "Misc",
						"size": 22
					}, {
						"name": "Platform",
						"size": 25
					}, {
						"name": "Puzzle",
						"size": 13
					}, {
						"name": "Racing",
						"size": 49
					}, {
						"name": "Role-Playing",
						"size": 27
					}, {
						"name": "Shooter",
						"size": 23
					}, {
						"name": "Simulation",
						"size": 8
					}, {
						"name": "Sports",
						"size": 71
					}, {
						"name": "Strategy",
						"size": 35
					}]
				},{
					"name": "1999",
					"children": [{
						"name": "Action",
						"size": 41
					}, {
						"name": "Adventure",
						"size": 20
					}, {
						"name": "Fighting",
						"size": 24
					}, {
						"name": "Misc",
						"size": 25
					}, {
						"name": "Platform",
						"size": 18
					}, {
						"name": "Puzzle",
						"size": 6
					}, {
						"name": "Racing",
						"size": 49
					}, {
						"name": "Role-Playing",
						"size": 33
					}, {
						"name": "Shooter",
						"size": 16
					}, {
						"name": "Simulation",
						"size": 20
					}, {
						"name": "Sports",
						"size": 62
					}, {
						"name": "Strategy",
						"size": 26
					}]
				},{
					"name": "2000",
					"children": [{
						"name": "Action",
						"size": 45
					}, {
						"name": "Adventure",
						"size": 16
					}, {
						"name": "Fighting",
						"size": 29
					}, {
						"name": "Misc",
						"size": 20
					}, {
						"name": "Platform",
						"size": 24
					}, {
						"name": "Puzzle",
						"size": 12
					}, {
						"name": "Racing",
						"size": 44
					}, {
						"name": "Role-Playing",
						"size": 30
					}, {
						"name": "Shooter",
						"size": 20
					}, {
						"name": "Simulation",
						"size": 15
					}, {
						"name": "Sports",
						"size": 82
					}, {
						"name": "Strategy",
						"size": 16
					}]
				},{
					"name": "2001",
					"children": [{
						"name": "Action",
						"size": 68
					}, {
						"name": "Adventure",
						"size": 23
					}, {
						"name": "Fighting",
						"size": 18
					}, {
						"name": "Misc",
						"size": 26
					}, {
						"name": "Platform",
						"size": 43
					}, {
						"name": "Puzzle",
						"size": 15
					}, {
						"name": "Racing",
						"size": 71
					}, {
						"name": "Role-Playing",
						"size": 41
					}, {
						"name": "Shooter",
						"size": 36
					}, {
						"name": "Simulation",
						"size": 29
					}, {
						"name": "Sports",
						"size": 98
					}, {
						"name": "Strategy",
						"size": 20
					}]
				},{
					"name": "2002",
					"children": [{
						"name": "Action",
						"size": 129
					}, {
						"name": "Adventure",
						"size": 42
					}, {
						"name": "Fighting",
						"size": 55
					}, {
						"name": "Misc",
						"size": 47
					}, {
						"name": "Platform",
						"size": 78
					}, {
						"name": "Puzzle",
						"size": 20
					}, {
						"name": "Racing",
						"size": 106
					}, {
						"name": "Role-Playing",
						"size": 56
					}, {
						"name": "Shooter",
						"size": 81
					}, {
						"name": "Simulation",
						"size": 19
					}, {
						"name": "Sports",
						"size": 194
					}, {
						"name": "Strategy",
						"size": 22
					}]
				},{
					"name": "2003",
					"children": [{
						"name": "Action",
						"size": 144
					}, {
						"name": "Adventure",
						"size": 12
					}, {
						"name": "Fighting",
						"size": 45
					}, {
						"name": "Misc",
						"size": 55
					}, {
						"name": "Platform",
						"size": 87
					}, {
						"name": "Puzzle",
						"size": 9
					}, {
						"name": "Racing",
						"size": 109
					}, {
						"name": "Role-Playing",
						"size": 48
					}, {
						"name": "Shooter",
						"size": 74
					}, {
						"name": "Simulation",
						"size": 35
					}, {
						"name": "Sports",
						"size": 128
					}, {
						"name": "Strategy",
						"size": 37
					}]
				},{
					"name": "2004",
					"children": [{
						"name": "Action",
						"size": 125
					}, {
						"name": "Adventure",
						"size": 39
					}, {
						"name": "Fighting",
						"size": 40
					}, {
						"name": "Misc",
						"size": 85
					}, {
						"name": "Platform",
						"size": 66
					}, {
						"name": "Puzzle",
						"size": 25
					}, {
						"name": "Racing",
						"size": 71
					}, {
						"name": "Role-Playing",
						"size": 60
					}, {
						"name": "Shooter",
						"size": 89
					}, {
						"name": "Simulation",
						"size": 27
					}, {
						"name": "Sports",
						"size": 108
					}, {
						"name": "Strategy",
						"size": 32
					}]
				},{
					"name": "2005",
					"children": [{
						"name": "Action",
						"size": 195
					}, {
						"name": "Adventure",
						"size": 42
					}, {
						"name": "Fighting",
						"size": 44
					}, {
						"name": "Misc",
						"size": 115
					}, {
						"name": "Platform",
						"size": 84
					}, {
						"name": "Puzzle",
						"size": 34
					}, {
						"name": "Racing",
						"size": 77
					}, {
						"name": "Role-Playing",
						"size": 71
					}, {
						"name": "Shooter",
						"size": 98
					}, {
						"name": "Simulation",
						"size": 38
					}, {
						"name": "Sports",
						"size": 124
					}, {
						"name": "Strategy",
						"size": 29
					}]
				},{
					"name": "2006",
					"children": [{
						"name": "Action",
						"size": 185
					}, {
						"name": "Adventure",
						"size": 71
					}, {
						"name": "Fighting",
						"size": 55
					}, {
						"name": "Misc",
						"size": 110
					}, {
						"name": "Platform",
						"size": 54
					}, {
						"name": "Puzzle",
						"size": 43
					}, {
						"name": "Racing",
						"size": 75
					}, {
						"name": "Role-Playing",
						"size": 111
					}, {
						"name": "Shooter",
						"size": 71
					}, {
						"name": "Simulation",
						"size": 59
					}, {
						"name": "Sports",
						"size": 142
					}, {
						"name": "Strategy",
						"size": 42
					}]
				},{
					"name": "2007",
					"children": [{
						"name": "Action",
						"size": 214
					}, {
						"name": "Adventure",
						"size": 84
					}, {
						"name": "Fighting",
						"size": 50
					}, {
						"name": "Misc",
						"size": 154
					}, {
						"name": "Platform",
						"size": 42
					}, {
						"name": "Puzzle",
						"size": 66
					}, {
						"name": "Racing",
						"size": 86
					}, {
						"name": "Role-Playing",
						"size": 104
					}, {
						"name": "Shooter",
						"size": 85
					}, {
						"name": "Simulation",
						"size": 90
					}, {
						"name": "Sports",
						"size": 168
					}, {
						"name": "Strategy",
						"size": 68
					}]
				},{
					"name": "2008",
					"children": [{
						"name": "Action",
						"size": 228
					}, {
						"name": "Adventure",
						"size": 166
					}, {
						"name": "Fighting",
						"size": 57
					}, {
						"name": "Misc",
						"size": 214
					}, {
						"name": "Platform",
						"size": 62
					}, {
						"name": "Puzzle",
						"size": 64
					}, {
						"name": "Racing",
						"size": 82
					}, {
						"name": "Role-Playing",
						"size": 113
					}, {
						"name": "Shooter",
						"size": 83
					}, {
						"name": "Simulation",
						"size": 119
					}, {
						"name": "Sports",
						"size": 203
					}, {
						"name": "Strategy",
						"size": 51
					}]
				},{
					"name": "2009",
					"children": [{
						"name": "Action",
						"size": 272
					}, {
						"name": "Adventure",
						"size": 141
					}, {
						"name": "Fighting",
						"size": 54
					}, {
						"name": "Misc",
						"size": 208
					}, {
						"name": "Platform",
						"size": 29
					}, {
						"name": "Puzzle",
						"size": 79
					}, {
						"name": "Racing",
						"size": 84
					}, {
						"name": "Role-Playing",
						"size": 103
					}, {
						"name": "Shooter",
						"size": 92
					}, {
						"name": "Simulation",
						"size": 126
					}, {
						"name": "Sports",
						"size": 184
					}, {
						"name": "Strategy",
						"size": 65
					}]
				},{
					"name": "2010",
					"children": [{
						"name": "Action",
						"size": 227
					}, {
						"name": "Adventure",
						"size": 156
					}, {
						"name": "Fighting",
						"size": 41
					}, {
						"name": "Misc",
						"size": 201
					}, {
						"name": "Platform",
						"size": 31
					}, {
						"name": "Puzzle",
						"size": 45
					}, {
						"name": "Racing",
						"size": 58
					}, {
						"name": "Role-Playing",
						"size": 103
					}, {
						"name": "Shooter",
						"size": 84
					}, {
						"name": "Simulation",
						"size": 83
					}, {
						"name": "Sports",
						"size": 191
					}, {
						"name": "Strategy",
						"size": 53
					}]
				},{
					"name": "2011",
					"children": [{
						"name": "Action",
						"size": 250
					}, {
						"name": "Adventure",
						"size": 108
					}, {
						"name": "Fighting",
						"size": 50
					}, {
						"name": "Misc",
						"size": 185
					}, {
						"name": "Platform",
						"size": 37
					}, {
						"name": "Puzzle",
						"size": 46
					}, {
						"name": "Racing",
						"size": 68
					}, {
						"name": "Role-Playing",
						"size": 95
					}, {
						"name": "Shooter",
						"size": 95
					}, {
						"name": "Simulation",
						"size": 57
					}, {
						"name": "Sports",
						"size": 122
					}, {
						"name": "Strategy",
						"size": 48
					}]
				},{
					"name": "2012",
					"children": [{
						"name": "Action",
						"size": 266
					}, {
						"name": "Adventure",
						"size": 58
					}, {
						"name": "Fighting",
						"size": 29
					}, {
						"name": "Misc",
						"size": 40
					}, {
						"name": "Platform",
						"size": 12
					}, {
						"name": "Puzzle",
						"size": 11
					}, {
						"name": "Racing",
						"size": 30
					}, {
						"name": "Role-Playing",
						"size": 79
					}, {
						"name": "Shooter",
						"size": 48
					}, {
						"name": "Simulation",
						"size": 18
					}, {
						"name": "Sports",
						"size": 54
					}, {
						"name": "Strategy",
						"size": 16
					}]
				},{
					"name": "2013",
					"children": [{
						"name": "Action",
						"size": 149
					}, {
						"name": "Adventure",
						"size": 60
					}, {
						"name": "Fighting",
						"size": 20
					}, {
						"name": "Misc",
						"size": 42
					}, {
						"name": "Platform",
						"size": 37
					}, {
						"name": "Puzzle",
						"size": 3
					}, {
						"name": "Racing",
						"size": 16
					}, {
						"name": "Role-Playing",
						"size": 71
					}, {
						"name": "Shooter",
						"size": 59
					}, {
						"name": "Simulation",
						"size": 18
					}, {
						"name": "Sports",
						"size": 54
					}, {
						"name": "Strategy",
						"size": 19
					}]
				},{
					"name": "2014",
					"children": [{
						"name": "Action",
						"size": 186
					}, {
						"name": "Adventure",
						"size": 75
					}, {
						"name": "Fighting",
						"size": 23
					}, {
						"name": "Misc",
						"size": 41
					}, {
						"name": "Platform",
						"size": 10
					}, {
						"name": "Puzzle",
						"size": 8
					}, {
						"name": "Racing",
						"size": 27
					}, {
						"name": "Role-Playing",
						"size": 91
					}, {
						"name": "Shooter",
						"size": 47
					}, {
						"name": "Simulation",
						"size": 11
					}, {
						"name": "Sports",
						"size": 55
					}, {
						"name": "Strategy",
						"size": 8
					}]
				},{
					"name": "2015",
					"children": [{
						"name": "Action",
						"size": 257
					}, {
						"name": "Adventure",
						"size": 54
					}, {
						"name": "Fighting",
						"size": 21
					}, {
						"name": "Misc",
						"size": 39
					}, {
						"name": "Platform",
						"size": 14
					}, {
						"name": "Puzzle",
						"size": 6
					}, {
						"name": "Racing",
						"size": 19
					}, {
						"name": "Role-Playing",
						"size": 78
					}, {
						"name": "Shooter",
						"size": 34
					}, {
						"name": "Simulation",
						"size": 15
					}, {
						"name": "Sports",
						"size": 62
					}, {
						"name": "Strategy",
						"size": 17
					}]
				},{
					"name": "2016",
					"children": [{
						"name": "Action",
						"size": 119
					}, {
						"name": "Adventure",
						"size": 34
					}, {
						"name": "Fighting",
						"size": 14
					}, {
						"name": "Misc",
						"size": 19
					}, {
						"name": "Platform",
						"size": 10
					},  {
						"name": "Racing",
						"size": 20
					}, {
						"name": "Role-Playing",
						"size": 40
					}, {
						"name": "Shooter",
						"size": 32
					}, {
						"name": "Simulation",
						"size": 9
					}, {
						"name": "Sports",
						"size": 38
					}, {
						"name": "Strategy",
						"size": 10
					}]
				},{
					"name": "2017",
					"children": [{
						"name": "Action",
						"size": 152
					}, {
						"name": "Action-Adventure",
						"size": 12
					}, {
						"name": "Adventure",
						"size": 124
					}, {
						"name": "Board Game",
						"size": 1
					}, {
						"name": "Fighting",
						"size": 18
					}, {
						"name": "MMO",
						"size": 10
					}, {
						"name": "Misc",
						"size": 35
					},{
						"name": "Music",
						"size": 15
					},{
						"name": "Party",
						"size": 3
					}, {
						"name": "Platform",
						"size": 38
					}, {
						"name": "Puzzle",
						"size": 16
					},  {
						"name": "Racing",
						"size": 61
					}, {
						"name": "Role-Playing",
						"size": 105
					}, {
						"name": "Shooter",
						"size": 60
					}, {
						"name": "Simulation",
						"size": 47
					}, {
						"name": "Sports",
						"size": 42
					}, {
						"name": "Strategy",
						"size": 34
					}, {
						"name": "Visual Novel",
						"size": 15
					}]
				},{
					"name": "2018",
					"children": [{
						"name": "Action",
						"size": 93
					}, {
						"name": "Action-Adventure",
						"size": 62
					}, {
						"name": "Adventure",
						"size": 48
					}, {
						"name": "Board Game",
						"size": 1
					}, {
						"name": "Fighting",
						"size": 34
					}, {
						"name": "MMO",
						"size": 6
					}, {
						"name": "Misc",
						"size": 25
					},{
						"name": "Music",
						"size": 20
					},{
						"name": "Party",
						"size": 8
					}, {
						"name": "Platform",
						"size": 45
					}, {
						"name": "Puzzle",
						"size": 14
					},  {
						"name": "Racing",
						"size": 50
					}, {
						"name": "Role-Playing",
						"size": 109
					}, {
						"name": "Sandbox",
						"size": 2
					}, {
						"name": "Shooter",
						"size": 35
					}, {
						"name": "Simulation",
						"size": 55
					}, {
						"name": "Sports",
						"size": 50
					}, {
						"name": "Strategy",
						"size": 24
					}, {
						"name": "Visual Novel",
						"size": 33
					}]
				},{
					"name": "1984",
					"children": [{
						"name": "Action",
						"size": 119
					}, {
						"name": "Adventure",
						"size": 34
					}, {
						"name": "Fighting",
						"size": 14
					}, {
						"name": "Misc",
						"size": 19
					}, {
						"name": "Platform",
						"size": 10
					},  {
						"name": "Racing",
						"size": 20
					}, {
						"name": "Role-Playing",
						"size": 40
					}, {
						"name": "Shooter",
						"size": 32
					}, {
						"name": "Simulation",
						"size": 9
					}, {
						"name": "Sports",
						"size": 38
					}, {
						"name": "Strategy",
						"size": 10
					}]
				},{
					"name": "1984",
					"children": [{
						"name": "Action",
						"size": 119
					}, {
						"name": "Adventure",
						"size": 34
					}, {
						"name": "Fighting",
						"size": 14
					}, {
						"name": "Misc",
						"size": 19
					}, {
						"name": "Platform",
						"size": 10
					},  {
						"name": "Racing",
						"size": 20
					}, {
						"name": "Role-Playing",
						"size": 40
					}, {
						"name": "Shooter",
						"size": 32
					}, {
						"name": "Simulation",
						"size": 9
					}, {
						"name": "Sports",
						"size": 38
					}, {
						"name": "Strategy",
						"size": 10
					}]
				}
			
			]

	}]}}