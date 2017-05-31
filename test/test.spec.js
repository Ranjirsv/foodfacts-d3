/*eslint-env mocha, node*/
let chai=require('chai');
let expect=chai.expect;
let output=require('../output/output.json');
let part1=require('../part1.js');
let output2=require('../output/output2.json');
let part2=require('../part2.js');
let expectedJSON=require('./expectedJSON.json');
let expectedJSON2=require('./expectedJSON2.json');
let jsonDiff=require('./jsondiff.js');

describe('check the output json1', function(){
     it('the typeof output is correct',function(done){
        expect(typeof output).to.deep.equal('object');
        done();
    } );
     it('the number of object',function(done){
        expect(output.length).to.deep.equal(9);
        done();
    } );
     it('check the output', function(done){
        let compareResult = jsonDiff.compareJSONObjects(expectedJSON, output);
        expect(compareResult.diffs).equal(0);
        done();
    });
     it('the input is array',function(done){
        expect(Array.isArray(part1.countries)).to.deep.equal(true);
        done();
    } );
      it('check the saltContent array size',function(done){
        expect(part1.saltContent.length).to.deep.equal(9);
        done();
    } );
      it('check the sugarContent array size',function(done){
        expect(part1.sugarContent.length).to.deep.equal(9);
        done();
    } );
});

describe('check the output json2', function(){
     it('the typeof output is correct',function(done){
        expect(typeof output2).to.deep.equal('object');
        done();
    } );
     it('the number of object',function(done){
        expect(output2.length).to.deep.equal(3);
        done();
    } );
     it('check the output', function(done){
        let compareResult = jsonDiff.compareJSONObjects(expectedJSON2, output2);
        expect(compareResult.diffs).equal(0);
        done();
    });
     it('the input is array',function(done){
        expect(Array.isArray(part2.countries)).to.deep.equal(true);
        done();
     });
      it('size of fatContent array',function(done){
        expect(part2.fatContent.length).to.deep.equal(15);
        done();
     });
     it('size of proteinContent array',function(done){
        expect(part2.proteinContent.length).to.deep.equal(15);
        done();
     });
     
       it('size of carboContent array',function(done){
        expect(part2.carboContent.length).to.deep.equal(15);
        done();
     });
     
     
     
     
});