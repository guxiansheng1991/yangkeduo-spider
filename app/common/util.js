/**
 * util 类提供通用方法
 */
const https = require('https');
const cheerio = require('cheerio');
const request = require('request');

class Util {
  constructor() {}

  // html请求
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

  // https请求
  httpRequest(ctx, url, headers) {
    let headersObj = this.getHeaders(headers);
    return new Promise((resolve, reject) => {
      ctx.curl(url, {
        dataType: 'json',
        method: 'get',
        headers: headersObj
      }).then(response => {
        // console.log('------------response--start--------------------', response);
        // console.log('------------response--end--------------------');
        if (response.status === 200 && !response.data.error_code) {
          console.log('data.items[0],', response.data.items[0]);
          resolve(response.data);
        } else {
          reject(response.data);
        }
      }).catch(e => {
        console.log('error', e);
        reject(e);
      });
    });
  }

  // 获取headers
  getHeaders(headersString) {
    const headersArray = headersString.split(/\r\n/);
    const headersObject = {};
    headersArray.forEach(ele => {
      const arr = ele.split(':');
      const key =  arr.length >= 0 ? arr[0] : '';
      let value =  arr.length >= 1 ? arr[1] : '';
      // value = value.replace(' ', '');
      headersObject[key] = value;
    });
    return headersObject;
  }

  // 获取产品list表格, 需要属性为: 产品主图, 产品id,产品url,产品名称,产品销量
  getProductList(list) {
    let resList = [];
    list.forEach(ele => {
      const product = ele.item_data.goods_model;
      resList.push({
        hd_thumb_url: product.hd_thumb_url,
        goods_id: product.goods_id,
        link_url: `https://mobile.yangkeduo.com/${product.link_url}`,
        goods_name: product.goods_name,
        sku_price: 0,
        sales: product.sales,
        comment_number: 0
      });
    });
    // console.log('产品list,', resList);
    return resList.reverse();
  }
}

module.exports = Util;
