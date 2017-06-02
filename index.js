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
/*file stream module is added*/
let fs = require('fs');
const readline = require('readline');
let row;
let read;
/*csv file is read using interface*/
let inputStream = fs.createReadStream('data/FoodFacts.csv');
console.log("read");
read = require('readline').createInterface({
    input: inputStream,
    terminal: false
});
/*countries array */
let countries = ['Netherlands', 'Canada', 'United Kingdom', 'United States',
    'Australia', 'France', 'Germany', 'Spain', 'South Africa'
];

let flag = true;
let country_index = 0;
let salt_index = 0;
let sugar_index = 0;
let saltContent = new Array(9).fill(0);
let sugarContent = new Array(9).fill(0);
let part1 = [];
/*data is splitted and stored in row array */
read.on('line', function(data) {
    row = data.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
    /* heading is separated */
    if (flag) {
        country_index = row.indexOf('countries_en');
        salt_index = row.indexOf('salt_100g');
        sugar_index = row.indexOf('sugars_100g');
    }

    if (country_index !== -1 || salt_index !== -1 || sugar_index !== -1) {
        let newIndex = indexFind(row[country_index], countries);

        sugarContent[newIndex] = sugarContent[newIndex] + Number(row[sugar_index]);
        saltContent[newIndex] = saltContent[newIndex] + Number(row[salt_index]);
    }
    flag = false;
});
/*countries, salt and sugar datas are added in part1 array */
read.on('close', function() {

    for (let i = 0; i < countries.length; i = i + 1) {
        part1.push({
            Country: countries[i],
            Salt: saltContent[i],
            Sugar: sugarContent[i]
        });
    }
    /*output json is written in output.json file */
    fs.writeFile('output/sugarsalt.json', JSON.stringify(part1));
console.log(part1);
});

/*exports for testing purpose */




/*eslint-env node */
/*function to find new index in array */
let indexFind1 = function(lineIndex, countries) {
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
let fs1 = require('fs');
const readline1 = require('readline');
let row1;
/*csv file read using interface*/
let inputStream1 = fs1.createReadStream('data/FoodFacts.csv');
let read1 = require('readline').createInterface({
    input: inputStream1,
    terminal: false
});
/*countries array */
let countries1 = ['United Kingdom', 'Denmark', 'Sweden', 'Norway', 'France', 'Belgium', 'Germany', 'Switzerland', 'Netherlands', 'Portugal', 'Greece', 'Italy', 'Spain', 'Croatia', 'Albania'];

let flag1 = true;
let country_index1 = 0;
let fat_index1 = 0;
let carbo_index1 = 0;
let protein_index1 = 0;
let fatContent1 = new Array(15).fill(0);
let proteinContent1 = new Array(15).fill(0);
let carboContent1 = new Array(15).fill(0);
let part2 = [];
read1.on('line', function(data) {
    row1 = data.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
    /*heading is separated in this condition*/
    if (flag1) {
        country_index1 = row1.indexOf('countries_en');
        carbo_index1 = row1.indexOf('carbohydrates_100g');
        fat_index1 = row1.indexOf('fat_100g');
        protein_index1 = row1.indexOf('proteins_100g');

    }
    /*datas are added in new index*/
    if (country_index1 !== -1 || fat_index1 !== -1 || protein_index1 !== -1 || carbo_index1 !== -1) {
        let newIndex1 = indexFind1(row1[country_index1], countries1);
        fatContent1[newIndex1] = fatContent1[newIndex1] + Number(row1[fat_index1]);
        proteinContent1[newIndex1] = proteinContent1[newIndex1] + Number(row1[protein_index1]);
        carboContent1[newIndex1] = carboContent1[newIndex1] + Number(row1[carbo_index1]);
    }
    flag1 = false;
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
read1.on('close', function() {
    console.log('close method enter');
    for (let i = 0; i < countries1.length; i = i + 1) {
        part2.push({
            Country: countries1[i],
            Fat: fatContent1[i],
            Protein: proteinContent1[i],
            Carbohydrate: carboContent1[i]

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
    fs1.writeFile('output/fatcarbs.json', JSON.stringify(arr));
    console.log(arr);
});
/*exports the data for testing purpose*/
module.exports = {
    countries, saltContent, sugarContent, countries1, fatContent1, proteinContent1, carboContent1
};



