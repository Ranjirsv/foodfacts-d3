describe ('the svg', function() {
    /*svg element is taken*/
    var svg = document.getElementsByTagName('svg');
    /*test case for length of svg should be 1*/
    it ('svg should be created', function() {
        expect(svg.length).to.equal(1);
    });
    /*svg should not be null*/
    it ('svg have rectangle for bar graph', function() {
        expect(document.getElementsByTagName('rect')).to.not.be.null;
    });

    function getSvg() {
        return d3.select('svg');
    }

});
