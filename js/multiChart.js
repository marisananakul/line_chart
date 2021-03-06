function multiChart() {
  var margin = {top: 50, right: 50, bottom: 50, left: 50},
      width = 760,
      height = 360,
      areaColor = "pink",
      lineColor = "grey",
      xValue = function(d) { return d[0]; },
      yValue = function(d) { return d[1]; },
      xScale = d3.time.scale(),
      yScale = d3.scale.linear(),
      xAxis = d3.svg.axis()
                .scale(xScale)
                .orient("bottom")
                .tickSize(6, 0),
      yAxis = d3.svg.axis()
                .scale(yScale)
                .orient("left");
      area = d3.svg.area().x(X).y1(Y),
      line = d3.svg.line().x(X).y(Y);

  function chart(selection) {
    selection.each(function(data) {

      // Convert data to standard representation greedily;
      // this is needed for nondeterministic accessors.
      data = data.map(function(d, i) {
        return [xValue.call(data, d, i), yValue.call(data, d, i)];
      });

      // Update the x-scale.
      xScale
          .domain(d3.extent(data, function(d) { return d[0]; }))
          .range([0, width - margin.left - margin.right]);

      // Update the y-scale.
      yScale
          .domain([0, d3.max(data, function(d) { return d[1]; })])
          .range([height - margin.top - margin.bottom, 0]);

      // Select the svg element, if it exists.
      var svg = d3.select(this).selectAll("svg").data([data]);

      // Otherwise, create the skeletal chart.
      var mainChart = svg.enter().append("svg").append("g");
      mainChart.append("path").attr("class", "area");
      mainChart.append("path").attr("class", "line");
      mainChart.append("g").attr("class", "x axis");
      mainChart.append("g").attr("class", "y axis");

      // Update the outer dimensions.
      svg .attr("width", width)
          .attr("height", height);

      // Update the inner dimensions.
      var g = svg.select("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      // Update the area path.
     g.select(".area")
          .attr("d", area.y0(yScale.range()[0]))
          .attr("fill", areaColor);

      // Update the line path.
      g.select(".line")
          .attr("d", line)
          .attr("stroke", lineColor);

      // Update the x-axis.
      g.select(".x.axis")
          .attr("transform", "translate(0," + yScale.range()[0] + ")")
          .call(xAxis)

      g.select(".y.axis")
          .attr("transform", "translate(0," + xScale.range()[0] + ")")
          .call(yAxis)
          .append("text")
            .attr("transform", "rotate(0)")
            .attr("y", 0)
            .attr("dy", "0em")
            .style("text-anchor", "start")
            .text(yLabel);;
    });
  }

  // The x-accessor for the path generator; xScale ∘ xValue.
  function X(d) {
    return xScale(d[0]);
  }

  // The x-accessor for the path generator; yScale ∘ yValue.
  function Y(d) {
    return yScale(d[1]);
  }

  chart.yLabel = function(_){
    if(!arguments.length) return yLabel;
    yLabel = _;
    return chart;  
  }

  chart.areaColor = function(_) {
    if(!arguments.length) return areaColor;
    areaColor =_;
    return chart;
  }

  chart.lineColor = function(_) {
    if(!arguments.length) return lineColor;
    lineColor =_;
    return chart;
  }

  chart.width = function(_) {
    if (!arguments.length) return width;
    width = _;
    return chart;
  };

  chart.height = function(_) {
    if (!arguments.length) return height;
    height = _;
    return chart;
  };

  chart.x = function(_) {
    if (!arguments.length) return xValue;
    xValue = _;
    return chart;
  };

  chart.y = function(_) {
    if (!arguments.length) return yValue;
    yValue = _;
    return chart;
  };

  return chart;
}