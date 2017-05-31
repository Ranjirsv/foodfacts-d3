describe('the svg', function() {
    /*svg element is taken*/
    var svg = document.getElementsByTagName('svg');
    /*test case for the length of svg element should be 1*/
    it('svg should be created', function() {
        expect(svg.length).to.equal(1);
    });
    /*the svg element should not be null*/
    it('svg have line for multiple line chart', function() {
        expect(document.getElementsByTagName('line')).to.not.be.null;
    });

    function getSvg() {
        return d3.select('svg');
    }
});