// margin declaration
let margin = {
    top: 20,
    right: 20,
    bottom: 30,
    left: 40
};
let width = 960 - margin.left - margin.right;
let height = 500 - margin.top - margin.bottom;
// let d3;
let x = d3.scale.ordinal()
    .rangeRoundBands([0, width], 0.1);
let y = d3.scale.linear()
    .rangeRound([height, 0]);
let color = d3.scale.ordinal()
    .range(['#98abc5', '#7b6888', '#8a89a6', '#6b486b', '#a05d56', '#d0743c', '#ff8c00']);
// declaration of x axis
let xAxis = d3.svg.axis()
    .scale(x)
    .orient('bottom');
// declaration of y axis
let yAxis = d3.svg.axis()
    .scale(y)
    .orient('left')
    .tickFormat(d3.format('.2s'));
// svg is append to the html page
let svg = d3.select('body').append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
// output json is append with d3
d3.json('../output/sugarsalt.json', function(error, data) {
    if (error) {
        throw error;
    }
    color.domain(d3.keys(data[0]).filter(function(key) {
        return key !== 'Country';
    }));
    data.forEach(function(d) {
        let y0 = 0;
        d.ages = color.domain().map(function(name) {
            return {
                name: name,
                y0: y0,
                y1: y0 += d[name]
            };
        });
        d.total = d.ages[d.ages.length - 1].y1;
    });
    // data sorted in descending order
    data.sort(function(a, b) {
        return b.total - a.total;
    });
    x.domain(data.map(function(d) {
        return d.Country;
    }));
    y.domain([0, d3.max(data, function(d) {
        return d.total;
    })]);
    svg.append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(0,' + height + ')')
        .call(xAxis);
    svg.append('g')
        .attr('class', 'y axis')
        .call(yAxis)
        .append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', 6)
        .attr('dy', '.71em')
        .style('text-anchor', 'end')
        .text('Consumption');
    let Country = svg.selectAll('.Country')
        .data(data)
        .enter().append('g')
        .attr('class', 'g')
        .attr('transform', function(d) {
            return 'translate(' + x(d.Country) + ',0)';
        });
    Country.selectAll('rect')
        .data(function(d) {
            return d.ages;
        })
        .enter().append('rect')
        .attr('width', x.rangeBand())
        .attr('y', function(d) {
            return y(d.y1);
        })
        .attr('height', function(d) {
            return y(d.y0) - y(d.y1);
        })
        .style('fill', function(d) {
            return color(d.name);
        });
    let legend = svg.selectAll('.legend')
        .data(color.domain().slice().reverse())
        .enter().append('g')
        .attr('class', 'legend')
        .attr('transform', function(d, i) {
            return 'translate(0,' + i * 20 + ')';
        });
    legend.append('rect')
        .attr('x', width - 18)
        .attr('width', 18)
        .attr('height', 18)
        .style('fill', color);
    legend.append('text')
        .attr('x', width - 24)
        .attr('y', 9)
        .attr('dy', '0.35em')
        .style('text-anchor', 'end')
        .text(function(d) {
            return d;
        });
});
