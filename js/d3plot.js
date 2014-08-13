// Actions
var listenPCA = document.getElementById("PCAplot");
listenPCA.addEventListener("click", PCAplot, false);

var listenHiperspec = document.getElementById("hiperspecPlot");
listenHiperspec.addEventListener("click", hiperspecPlot, false);



var margin = {top: 20, right: 30, bottom: 60, left: 60},
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
    .call(xAxis)
  .append("g")
    .attr("transform", "translate(" + width/2 + ",40)")
  .append("text")
    .attr("class", "xLabel")
    .style("text-anchor", "middle");

graph.append("g")
    .attr("class", "y axis")
    .call(yAxis)
  .append("g")
    .attr("transform", "translate(-40," + height/2 + ")")
  .append("text")
    .attr("class", "yLabel")
    .attr("transform", "rotate(-90)")
    .style("text-anchor", "middle");


// Legend
graph.append("g")
  .append("rect")
    .attr("width", 10)
    .attr("height", 10)
    .attr("transform", "translate(485,380)")
    .style("fill", "red");

graph.append("text")
    .attr("transform", "translate(500,380)")
    .attr("dy", ".71em")
    .style("text-anchor", "start")
    .text("Decay mandarins");

graph.append("rect")
    .attr("width", 10)
    .attr("height", 10)
    .attr("transform", "translate(485,400)")
    .style("fill", "green");

graph.append("text")
    .attr("transform", "translate(500,400)")
    .attr("dy", ".71em")
    .style("text-anchor", "start")
    .text("Sound mandarins");

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

        // Initial plot
        var feature1 = Math.round(Math.random()*50)
        var feature2 = Math.round(Math.random()*50 + 1400)

        circles
            .transition()
            .duration(750)
            .attr("cx", function(d) { return xScale(d.hiperspec[Math.round(feature1)]) })
            .attr("cy", function(d) { return yScale(d.hiperspec[Math.round(feature2)]) }); 

        d3.select(".yLabel")
            .text("Original feature " + feature2);
        d3.select(".xLabel")
            .text("Original feature " + feature1);
    });



function hiperspecPlot() {

    // Get features from the inputs
    feature1 = document.getElementById('feature1').value;
    feature2 = document.getElementById('feature2').value; 

    if (  (feature1 >= 0 && feature1 <1568 && feature1 != "") && (feature2 >= 0 && feature2 <1568 && feature2 != "") ) {
        circles
          .transition()
            .duration(750)
            .attr("cx", function(d) { return xScale(d.hiperspec[Math.round(feature1)]) })
            .attr("cy", function(d) { return yScale(d.hiperspec[Math.round(feature2)]) }); 

        d3.select(".yLabel")
            .text("Original feature " + feature2);
        d3.select(".xLabel")
            .text("Original feature " + feature1);

    }
    
    else {
        alert("Features should be between 0 and 1568!");
    }

}

function PCAplot() {
    circles
      .transition()
        .duration(750)
        .attr("cx", function(d) { return xScale(d.MLE[0]) })
        .attr("cy", function(d) { return yScale(d.MLE[1]) });

    d3.select(".yLabel")
        .text("PCA feature 2");
    d3.select(".xLabel")
        .text("PCA feature 1");
}