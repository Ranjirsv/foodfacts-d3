/* eslint-env mocha, node */
/* chai module is added */
let chai = require('chai');
let expect = chai.expect;
/* json output of salt and sugar consumption */
let output = require('../output/sugarsalt.json');
/* javascript file of salt and sugar consumption, */
let index = require('../index.js');
/* json output file of fat, protein, carbohydrate */
let output2 = require('../output/fatcarbs.json');


/* expected json files */
let expectedJSON = require('./expectedJSON.json');
let expectedJSON2 = require('./expectedJSON2.json');
/* javascript file to compare two json files*/
let jsonDiff = require('./jsondiff.js');
/* test cases for first file, salt sugar consumption vs country */
describe('check the output json1', function() {
    it('the typeof output is correct', function(done) {
        expect(typeof output).to.deep.equal('object');
        done();
    });
    it('the number of object in json file', function(done) {
        expect(output.length).to.deep.equal(9);
        done();
    });
    it('check the output', function(done) {
        let compareResult = jsonDiff.compareJSONObjects(expectedJSON, output);
        expect(compareResult.diffs).equal(0);
        done();
    });
    it('the input should be an array', function(done) {
        expect(Array.isArray(index.countries)).to.deep.equal(true);
        done();
    });
    it('check the saltContent array size', function(done) {
        expect(index.saltContent.length).to.deep.equal(9);
        done();
    });
    it('check the sugarContent array size', function(done) {
        expect(index.sugarContent.length).to.deep.equal(9);
        done();
    });
});
/* test cases for second file, fat,protein,carbohydratevs country */
describe('check the output json2', function() {
    it('the typeof output is correct', function(done) {
        expect(typeof output2).to.deep.equal('object');
        done();
    });
    it('the number of object in json file', function(done) {
        expect(output2.length).to.deep.equal(3);
        done();
    });
    it('check the output', function(done) {
        let compareResult = jsonDiff.compareJSONObjects(expectedJSON2, output2);
        expect(compareResult.diffs).equal(0);
        done();
    });
    it('the input should be an array', function(done) {
        expect(Array.isArray(index.countries1)).to.deep.equal(true);
        done();
    });
    it('size of fatContent array', function(done) {
        expect(index.fatContent1.length).to.deep.equal(15);
        done();
    });
    it('size of proteinContent array', function(done) {
        expect(index.proteinContent1.length).to.deep.equal(15);
        done();
    });

    it('size of carboContent array', function(done) {
        expect(index.carboContent1.length).to.deep.equal(15);
        done();
    });

});
