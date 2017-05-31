/*eslint-env node */

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

let fs=require('fs');
const readline=require('readline');
let row;
let read;
console.log("food csv");
let inputStream = fs.createReadStream('../data/FoodFacts.csv');
console.log("read");
        read = require('readline').createInterface({
        input: inputStream,
        terminal: false
         });

    let countries=['Netherlands', 'Canada', 'United Kingdom', 'United States',
    'Australia', 'France', 'Germany', 'Spain', 'South Africa'];
   
    let flag=true;
    let country_index=0;
    let salt_index=0;
    let sugar_index=0;
    let saltContent = new Array(9).fill(0);
    let sugarContent = new Array(9).fill(0);
    let part1=[];
read.on('line',function(data){
row=data.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
if(flag){
    country_index=row.indexOf('countries_en');
    salt_index=row.indexOf('salt_100g');
    sugar_index=row.indexOf('sugars_100g');  
}

 if (country_index !== -1 || salt_index !== -1 || sugar_index !== -1) {
           let newIndex = indexFind(row[country_index], countries);
           
            sugarContent[newIndex] = sugarContent[newIndex] + Number(row[sugar_index]);
            saltContent[newIndex] = saltContent[newIndex] + Number(row[salt_index]);
        }
flag=false;
});
read.on('close',function(){
    console.log('close fn');
    for (let i = 0; i < countries.length; i = i + 1) {
            part1.push({
                Country: countries[i],
                Salt: saltContent[i],
                Sugar: sugarContent[i]
            });
        }
        fs.writeFile('../output/output.json', JSON.stringify(part1));
        console.log(part1.length);
});
 module.exports={countries,saltContent,sugarContent};
 









 