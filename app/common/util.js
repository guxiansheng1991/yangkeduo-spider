/**
 * util 类提供通用方法
 */
const https = require('https');
const cheerio = require('cheerio');

class Util {
  constructor() {}

  // http请求
  getHtmlData(url) {
    return new Promise((resolve, reject) => {
      https.get(url, function (res) {
        let str = '';
        res.on('data', function (chunk) {
          str += chunk;
        })
        res.on('end', function () {
          const $ = cheerio.load(str);
          if ($) {
            resolve($);
          } else {
            console.error('html内容', str);
            console.error('html的$内容', $);
            reject('出现错误');
          }
        })
      })
    });
  }
}

module.exports = Util;
