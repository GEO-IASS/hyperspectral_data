// Actions
var listenMLE = document.getElementById("MLEplot");
listenMLE.addEventListener("click", MLEplot, false);

var listenHiperspec = document.getElementById("hiperspecPlot");
listenHiperspec.addEventListener("click", hiperspecPlot, false);


var width = 500;
var height = 300;

var graph = d3.select(".chart")
    .attr("width", width)
    .attr("height", height);

graph.append("rect")
    .attr("width", width)
    .attr("height", height)
    .style("fill", "#CCEEFF");

var xScale = d3.scale.linear()
    .domain([0, 1])
    .range([0, width]);

var yScale = d3.scale.linear()
    .domain([0, 1])
    .range([0, height]);


d3.json("data/orangesData.json", function(orangesJson) {
    
    circles = graph.selectAll("circle")
        .data(orangesJson);

    circles.enter()
        .append("circle")
        .attr("r", 4)
        .attr("cx", width/2)
        .attr("cy", height/2)
        .style("fill", function(d) {
            if (d.class === 1) {
                return "green";
            }
            else {
                return "red";
            }
        });

    });

function hiperspecPlot() {
    circles
      .transition()
        .duration(750)
        .attr("cx", function(d) { return xScale(d.hiperspec[0]) })
        .attr("cy", function(d) { return yScale(d.hiperspec[11]) });
}

function MLEplot() {
    circles
      .transition()
        .duration(750)
        .attr("cx", function(d) { return xScale(d.MLE[0]) })
        .attr("cy", function(d) { return yScale(d.MLE[1]) });
}