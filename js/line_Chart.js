//margin declaration
let margin = {
    top: 30,
    right: 120,
    bottom: 30,
    left: 100
};
let width = 700 - margin.left - margin.right;
let height = 270 - margin.top - margin.bottom;
let x = d3.scale.ordinal()
    .rangeRoundBands([0, width], 0.2, 0.2);
let y = d3.scale.linear().range([height, 0]);
//xAxis declaration
let xAxis = d3.svg.axis().scale(x)
    .orient('bottom');
//yAxis declaration
let yAxis = d3.svg.axis().scale(y)
    .orient('left');
//valueline taken from three datas
let valueline = d3.svg.line()
    .x(function(d) {
        return x(d.Country);
    })
    .y(function(d) {
        return y(d.Fat_100g);
    });

let valueline2 = d3.svg.line()
    .x(function(d) {
        return x(d.Country);
    })
    .y(function(d) {
        return y(d.Protein);
    });

let valueline3 = d3.svg.line()
    .x(function(d) {
        return x(d.Country);
    })
    .y(function(d) {
        return y(d.Carbohydrate);
    });

//svg append with html document

let svg = d3.select('body')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
//output json is append with d3
d3.json('../output/output2.json', function(error, data) {
    data.forEach(function(d) {
        d.Country = d.Country;
        d.Fat_100g = +d.Fat_100g;
        d.Protein = +d.Protein;
        d.Carbohydrate = +d.Carbohydrate;
    });
    x.domain(data.map(function(d) {
        return d.Country;
    }));
    y.domain([0, d3.max(data, function(d) {
        return Math.max(d.Fat_100g, d.Protein, d.Carbohydrate);
    })]);
    //svg append path for three valuelines
    svg.append('path')
        .attr('class', 'line')
        .style('stroke', 'red')
        .style('fill', 'none')
        .style('stroke-width', 2)
        .attr('d', valueline(data));

    svg.append('path')
        .attr('class', 'line')
        .style('stroke', 'green')
        .style('fill', 'none')
        .style('stroke-width', 2)
        .attr('d', valueline2(data));

    svg.append('path')
        .attr('class', 'line')
        .style('stroke', 'blue')
        .style('fill', 'none')
        .style('stroke-width', 2)
        .attr('d', valueline3(data));

    svg.append('g')
        .attr('class', 'x axis')

    .attr('transform', 'translate(0,' + height + ')')
        .call(xAxis);

    svg.append('g')
        .attr('class', 'y axis')
        .call(yAxis);
    //svg append text for texts
    //fat_100g
    svg.append('text')
        .attr('transform', 'translate(' + (width + 3) + ',' + y(data[0].Fat_100g) + ')')
        .attr('dy', '-5em')
        .attr('text-anchor', 'start')
        .style('fill', 'red')
        .text('Fat_100g');
    //protein
    svg.append('text')
        .attr('transform', 'translate(' + (width + 3) + ',' + y(data[0].Protein) + ')')
        .attr('dy', '-3em')
        .attr('text-anchor', 'start')
        .style('fill', 'green')
        .text('Protein');
    //carbohydrate
    svg.append('text')
        .attr('transform', 'translate(' + (width + 3) + ',' + y(data[0].Carbohydrate) + ')')
        .attr('dy', '-1em')
        .attr('text-anchor', 'start')
        .style('fill', 'blue')
        .text('Carbohydrate');
});