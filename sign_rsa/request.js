const ZhonganClient = require('./lib/zhong-an-client')
const moment = require('moment')

let env = `iTest`
let appKey = `10001`
let privateKey = `MIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGBAO8h8JCJAMb1nd0uBkzZuWyNnL+atBzJKvIG7escD45ODf0AWKr8vSqLZ01HD86+a496CGjsae6GybK8C1MqiMSwaAsIv31nKD6U8xF607MPrD3r2lyjwUnmqBZY++R6yFNYz9ZDXcdiwCudESRsXunPJq7zfnnglCtEH+qqW8/VAgMBAAECgYEAnVc2gtMyKLbZTPuId65WG7+9oDB5S+ttD1xR1P1cmuRuvcYpkS/Eg6a/rJASLZULDpdbyzWqqaAUPD8QMINvAr3ZtkbwH5R0F/4aqOlx/5B0Okjsp3eSK2bQ8J2m/MmFKZxr6Aily7YUDdxcGcjLizsGi1KDkWS22JRufEeUNA0CQQD+g1XJ7ELqmUtrS4m4XnadB25f0g5QC0tMjoa3d9soMzK3q+Drkv8EZVpGSmSHEo1VlE7HUcnKNvK1BO5Nm4iXAkEA8IeZxaWmEcsRqiuFz8xmYGtKcYTmHgheGF4D+fnnFozSNP+3sS1lfgFQrjUkqUyZOoG1hPc6SDhGS4nbXwiscwJASO+gPR58yrgledkK3ZAMk9GWWtVajqu953GMv7UUU//gD+yspzXX6Q2WgkA9cMvrPtQig1I37sAya5e/JvRkfwJARzzCDEmdP9PW7YFqZjrxb0kXiTuFNAviYnEl2FltWb5nW48JBo6dao5VKONQclvfXfagnjriphUUrLatpB3bhQJAKRfJS6jDAIVKt7So5HOdzk4ipxgrMjG/QtZ1grO+VQectk4+tCwdJhOrr5blvdPQvFVqXBQfXuE7cibZrGs4sQ==`
let client = new ZhonganClient(env, appKey, privateKey);
;(async () => {
  let options = {
    // contentType: `application/x-www-form-urlencoded;charset=utf-8`
  }
  let infoJson = {
    "channelCode": "A000001",
    "channelAppCode": "",
    "channelId": "1553",
    "campaignDefId": "10002535445",
    "channelOrderNo": "123456789",
    "productCode": "6302",
    "applyTime": "20170101000000",
    "effectiveTime": "20170101000000",
    "expireTime": "20171231235959",
    "sumPremium": "200.00",
    "policyHolder": {
      "name": "张三",
      "certType": "I",
      "certNo": "110101xxxxxxxx6661",
      "gender": "F",
      "birthday": "19830101",
      "phone": "158xxxx0098",
      "email": "zhangxxx01@126.com"
    },
    "policies": [{
      "renewedPolicyNo": "88xxxxxxxxxxxxx001",
      "productCode": "6302",
      "applyNum": "1",
      "sumAmount": "200000.00",
      "premium": "200.00",
      "insured": {
        "relationToPH": "1",
        "name": "张三",
        "certType": "I",
        "certNo": "110101xxxxxxxx6661",
        "gender": "F",
        "birthday": "19830101",
        "phone": "158xxxx0098",
        "hasSocialInsurance": "Y",
        "jobCode": "0816044"
      },
      "beneficiaries": [{
        "relationToInsured": "3",
        "name": "张小三",
        "certType": "I",
        "certNo": "110101xxxxxxxx6662",
        "gender": "M",
        "birthday": "20100101",
        "phone": "158xxxx0099",
        "beneficiaryType": "2",
        "ordering": "1",
        "benifitRate": "100.00"
      }
      ],
      "isAutoRenewal": "Y",
      "renewalAuthAccount": {
        "name": "张三",
        "phone": "158xxxx0098",
        "accountNo": "6217xxxxxxxxxxxx874",
        "orgCode": "001"
      }
    }
    ]
  }
  let data = {
    appKey: appKey,
    serviceName: `zhongan.health.personal.policy.multiAcceptPolicy`,
    bizContent: {infoJson},
    timestamp: moment().format('YYYYMMDDHHmmssSSS'),
    format: 'json',
    signType: 'RSA',
    charset: 'UTF-8',
    version: '1.0.0'
  }
  let result = await client.post(options, data)
  return result
})()
  .then(result => {
    console.log(result.obj)
  })
  .catch(err => {
    console.log(err)
    console.log('err====')
  })

