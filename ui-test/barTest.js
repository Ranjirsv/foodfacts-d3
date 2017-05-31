describe('the svg', function(){
    console.log('enterrr');
    var svg=document.getElementsByTagName('svg');
    console.log(svg);
    it('svg should be created', function(){
        expect(svg.length).to.equal(1);
    });
    it('svg have rectangle for bar graph', function(){
        expect(document.getElementsByTagName('rect')).to.not.be.null;
    });
    function getSvg(){
    return d3.select('svg');
}

});
