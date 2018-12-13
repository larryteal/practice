const xlsx = require('node-xlsx');
const fs = require('fs');

const workSheetsFromFile = xlsx.parse(`${__dirname}/银行信息维护统计20181203.xlsx`);
let data = workSheetsFromFile[0].data;
// console.log(workSheetsFromFile[0].data)
let json = {};
let keyName = 'default';
for( let i = 1; i < data.length; i++  ){
  !!data[i][0] ? keyName = data[i][0] : false;
  !!json[keyName] ? false : json[keyName] = [];
  
  json[keyName].push({
    bankName: data[i][1],
    bankCode: data[i][2]
  })
  // json[`gender_${data[i][1]}|chargeCode_${data[i][2]}|age_${data[i][0]}`] = data[i][4]
}

fs.writeFile(`${__dirname}/TFQQRSBank.json`,JSON.stringify(json,null,4));

