'use strict';

const Controller = require('egg').Controller;
const Util = require('../common/util');

class HomeController extends Controller {
  /**
   * 拼多多相关接口
   * 评论: http://apiv3.yangkeduo.com/reviews/6891352110/list?&size=20&page=1
   * 热销商品列表:  http://apiv3.yangkeduo.com/v5/goods?page=1&size=10
   */
  async index() {
    const that = this;
    const url = 'https://mobile.yangkeduo.com/search_result.html?search_key=%E6%9F%A0%E6%AA%AC%E5%AE%9D%E5%AE%9D%E9%81%AE%E9%98%B3&search_met_track=history&source=index&options=1&refer_search_met_pos=1&refer_page_el_sn=99887&refer_page_name=login&refer_page_id=10169_1589260140848_fy6tlzwu62&refer_page_sn=10169';
    const util = new Util();
    let $ = null;
    const pageData = {
      list: [],
      msg: '',
      code: 200
    };
    try {
      $ = await util.getHtmlData(url);

    } catch (e) {
      console.error('错误信息', e);
      pageData.code = 0;
      pageData.msg = '遇到错误, 请重试!';
      pageData.list = [];
    } finally {
      await that.ctx.render('home/home.tpl', pageData);
    }
  }
}

module.exports = HomeController;
