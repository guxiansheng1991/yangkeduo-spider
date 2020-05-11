'use strict';

const Controller = require('egg').Controller;
const cheerio = require('cheerio');
const http = require('http');

class HomeController extends Controller {
  async index() {
    const that = this;
    const url = 'http://www.mcake.com/shop/110/index.html#mainer_top';
    http.get(url, function (res) {
      let str = '';
      res.on('data', function (chunk) {
        str += chunk;
      })
      res.on('end', function () {
        let html = that.getData(str);
        console.log(str);
      })
    })
  }

  getData(str) {
    const $ = cheerio.load(str);
    var arr = $(".pro_box a:nth-child(1) img");
    var dataTemp = [];
    //遍历得到数据的src，并放入以上定义的数组中
    arr.each(function(k,v){
      var src = $(v).attr("src");
      dataTemp.push(src);
    })
    //返回出去
    return dataTemp;
  }
}

module.exports = HomeController;
