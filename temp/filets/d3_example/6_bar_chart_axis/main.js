/*
 * 给bar chart加上坐标轴
 */
var margin = {top: 20, right: 30, bottom: 30, left: 40},
  width = 960 - margin.left - margin.right,
  height = 500 - margin.top - margin.bottom;

var x = d3.scaleBand().range([0, width])
  .round(true)
  .padding(0.1)

var y = d3.scaleLinear()
  .range([height, 0]);

/*
 * 分别定义x 和 y 坐标轴
 */
var xAxis = d3.axisBottom()
  .scale(x) // 指定其对应的scale对象

var yAxis = d3.axisLeft()
  .scale(y)

var chart = d3.select(".chart")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.tsv("data.tsv", type, function(error, data) {
  x.domain(data.map(function(d) { return d.name; }));
  y.domain([0, d3.max(data, function(d) { return d.value; })]);

  chart.append("g")
    .attr("transform", "translate(0," + height + ")") // 由x坐标轴默认在最上方，因此需要translate到底下去
    .call(xAxis);

  chart.append("g") // y轴初始位置在最左边，因此正好符合需要
    .call(yAxis);

  chart.selectAll(".bar")
    .data(data)
    .enter().append("rect")
    .attr("class", "bar")
    .attr("x", function(d) { return x(d.name); })
    .attr("y", function(d) { return y(d.value); })
    .attr("height", function(d) { return height - y(d.value); })
    .attr("width", x.bandwidth());
});

function type(d) {
  d.value = +d.value; // coerce to number
  return d;
}

