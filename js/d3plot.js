// Actions
var listenMLE = document.getElementById("MLEplot");
listenMLE.addEventListener("click", MLEplot, false);

var listenHiperspec = document.getElementById("hiperspecPlot");
listenHiperspec.addEventListener("click", hiperspecPlot, false);


var margin = {top: 20, right: 30, bottom: 30, left: 40},
    width = 700 - margin.left - margin.right;
    height = 500 - margin.top - margin.bottom;

var graph = d3.select(".chart")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

graph.append("rect")
    .attr("width", width)
    .attr("height", height)
    .style("fill", "white");

var xScale = d3.scale.linear()
    .domain([0, 1])
    .range([0, width]);

var yScale = d3.scale.linear()
    .domain([0, 1])
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(xScale)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(yScale)
    .orient("left");

graph.append('g')
    .attr("class", "x axis")
    .attr("transform", "translate(0, " + height + " )")
    .call(xAxis);

graph.append("g")
    .attr("class", "y axis")
    .call(yAxis);


d3.json("data/orangesData.json", function(orangesJson) {
    
    circles = graph.selectAll("circle")
        .data(orangesJson);

    circles.enter()
        .append("circle")
        .attr("r", 7)
        .attr("cx", width/2)
        .attr("cy", height/2)
        .attr("class", function(d) {
            if (d.class === 1) {
                return "sample sound";
            }
            else {
                return "sample decay";
            }
        });

    });

function hiperspecPlot() {
    // Get features from the inputs
    var feature1 = document.getElementById('feature1').value;
    var feature2 = document.getElementById('feature2').value;

    if (  (feature1 >= 0 && feature1 <1568) && (feature2 >= 0 && feature2 <1568) ) {
        circles
          .transition()
            .duration(750)
            .attr("cx", function(d) { return xScale(d.hiperspec[Math.round(feature1)]) })
            .attr("cy", function(d) { return yScale(d.hiperspec[Math.round(feature2)]) }); 
    }
    
    else {
        alert("Features should be between 0 and 1568!");
    }

}

function MLEplot() {
    circles
      .transition()
        .duration(750)
        .attr("cx", function(d) { return xScale(d.MLE[0]) })
        .attr("cy", function(d) { return yScale(d.MLE[1]) });
}