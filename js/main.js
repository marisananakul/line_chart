
//Document.getElementById("try").innerHTML = 
      //var formatDate = d3.time.format("%Y");
$(function() {
    var mychart = multiChart()
    .x(function(d){return +d.time}).y(function(d){return d.AirPassengers}).height(400).width(1000).areaColor('blue').yLabel('Number of passengers')
        // .x(function(d) { return formatDate.parse(d.date); })
        // .y(function(d) { return +d.price; })
        // .yLabel("temp");

    var formatDate = d3.time.format("%Y");
    
    d3.csv("data/AirPassengers.csv", function(data) {
    	var chartWrapper = d3.select("#example")
          					 .datum(data)
          					 .call(mychart);
         chartWrapper.datum(data).call(mychart);
    });
    // var mychart2 = multiChart()
    //     .x(function(d) { return formatDate.parse(d.date); })
    //     .y(function(d) { return +d.price; })
    //     .yLabel("price");

    // var formatDate = d3.time.format("%b %Y");
    
    // d3.csv("data/sp500.csv", function(data) {
    //   var chartWrapper = d3.select("#example")
    //                  .datum(data)
    //                  .call(mychart2);
    //      chartWrapper.datum(data).call(mychart2);
    // });

});