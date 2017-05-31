/*eslint-env node */
/*function to find new index in array */
let indexFind = function(lineIndex, countries) {
    this.countries = countries;
    let index = -1;
    if (lineIndex) {
        for (let i = 0; i < countries.length; i = i + 1) {
            if (lineIndex.includes(countries[i])) {
                index = i;
            }
        }
    }
    return index;
};
/*file stream module is added */
let fs = require('fs');
const readline = require('readline');
let row;
/*csv file read using interface*/
let inputStream = fs.createReadStream('../data/FoodFacts.csv');
let read = require('readline').createInterface({
    input: inputStream,
    terminal: false
});
/*countries array */
let countries = ['United Kingdom', 'Denmark', 'Sweden', 'Norway', 'France', 'Belgium', 'Germany', 'Switzerland', 'Netherlands', 'Portugal', 'Greece', 'Italy', 'Spain', 'Croatia', 'Albania'];

let flag = true;
let country_index = 0;
let fat_index = 0;
let carbo_index = 0;
let protein_index = 0;
let fatContent = new Array(15).fill(0);
let proteinContent = new Array(15).fill(0);
let carboContent = new Array(15).fill(0);
let part2 = [];
read.on('line', function(data) {
    row = data.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
    /*heading is separated in this condition*/
    if (flag) {
        country_index = row.indexOf('countries_en');
        carbo_index = row.indexOf('carbohydrates_100g');
        fat_index = row.indexOf('fat_100g');
        protein_index = row.indexOf('proteins_100g');

    }
    /*datas are added in new index*/
    if (country_index !== -1 || fat_index !== -1 || protein_index !== -1 || carbo_index !== -1) {
        let newIndex = indexFind(row[country_index], countries);
        fatContent[newIndex] = fatContent[newIndex] + Number(row[fat_index]);
        proteinContent[newIndex] = proteinContent[newIndex] + Number(row[protein_index]);
        carboContent[newIndex] = carboContent[newIndex] + Number(row[carbo_index]);
    }
    flag = false;
});
let arr = [];
let fatof_North = 0;
let proteinof_North = 0;
let carbo_North = 0;
let fatof_Central = 0;
let proteinof_Central = 0;
let carbo_Central = 0;
let fatof_South = 0;
let proteinof_South = 0;
let carbo_South = 0;
/*countries, fat, protein and carbohydrate are added in part2 array */
read.on('close', function() {
    console.log('close method enter');
    for (let i = 0; i < countries.length; i = i + 1) {
        part2.push({
            Country: countries[i],
            Fat: fatContent[i],
            Protein: proteinContent[i],
            Carbohydrate: carboContent[i]

        });

    }
    /*data is again arranged as three regions*/
    part2.map(function(key) {
        if (key.Country === 'United Kingdom' || key.Country === 'Denmark' || key.Country === 'Sweden' || key.Country === 'Norway') {
            fatof_North = fatof_North + Number(key.Fat);
            proteinof_North = proteinof_North + Number(key.Protein);
            carbo_North = carbo_North + Number(key.Carbohydrate);
        }
        if (key.Country === 'France' || key.Country === 'Belgium' || key.Country === 'Germany' || key.Country === 'Switzerland' || key.Country === 'Netherlands') {
            fatof_Central = fatof_Central + Number(key.Fat);
            proteinof_Central = proteinof_Central + Number(key.Protein);
            carbo_Central = carbo_Central + Number(key.Carbohydrate);
        }
        if (key.Country === 'Portugal' || key.Country === 'Greece' || key.Country === 'Italy' || key.Country === 'Spain' || key.Country === 'Croatia' || key.Country === 'Albania') {
            fatof_South = fatof_South + Number(key.Fat);
            proteinof_South = proteinof_South + Number(key.Protein);
            carbo_South = carbo_South + Number(key.Carbohydrate);

        }
    });
    /*array arr is pushed with three objects*/
    arr.push({
        'Country': 'North Europe',
        'Fat_100g': fatof_North,
        'Protein': proteinof_North,
        'Carbohydrate': carbo_North
    });
    arr.push({
        'Country': 'Central Europe',
        'Fat_100g': fatof_Central,
        'Protein': proteinof_Central,
        'Carbohydrate': carbo_Central
    });
    arr.push({
        'Country': 'South Europe',
        'Fat_100g': fatof_South,
        'Protein': proteinof_South,
        'Carbohydrate': carbo_South
    });

    /*output json file is written in to output2.json*/
    fs.writeFile('../output/output2.json', JSON.stringify(arr));
});
/*exports the data for testing purpose*/
module.exports = {
    countries, fatContent, proteinContent, carboContent
};