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
    // 参数
    const { ctx } = this;
    const query = ctx.request.query;
    const resData = {
      code: 0,
      msg: '',
      list: [],
      reqParams: ''
    };
    if (!query.headers || !query.size || !query.sort || !query.q) {
      resData.code = 0;
      resData.msg = '缺少必要参数,请重试!';
      resData.list = [];
      await ctx.render('home/alibaba.tpl', resData);
    } else {
      const util = new Util();
      const searchUrl = `https://mobile.yangkeduo.com/proxy/api/search?pdduid=6722159943&is_back=1&item_ver=lzqq&source=search&search_met=history&track_data=refer_page_id,10031_1589427740027_ig2nuyna68%3Brefer_search_met_pos,1&list_id=PtEu4L7odq&sort=${query.sort}&filter=&q=${encodeURIComponent(query.q)}&page=1&size=${query.size}&flip=20%3B3%3B0%3B0%3B611052bc-e4b4-412f-b98e-16077537f105&anti_content=0aoAfxvdHOcYY9dMEaDCU94FZo1e4gmOkGJlDeM14qUK9bv7YCVdutvbuZpjHpjl6JSpveHi2zi9G6c5VvLi9_i91kYsujxcQmmM7hchutukDd9g42J4uAV9l979zaibhBgaym28QhgreH9jOrbRV09RermWJ66msUGS6dfo_7C9cg0HCvQJe1MknIkCQQeLLZcZi1yS-wH-1wd7C7bieaB0en0FZUv0mSoNUOknzUOa8zzhI-wbMpF_fJFUDLU1FWgu_z8f8--b6S_jDN0ZP_ytrJfovG73naXxB5OyjdTqKYJ1zKzI5Svkr1TlOWy0Zh1VlzvS8vtl1lFW3AOEQRUP5ZMQU8NtMmPou5cpfhUyKOg5-eZCCqpXI4sxnjzQXZcvC6ogtka90DJtuHWo7lEYBA3V7z4DBtkO16I_6OyloTVEVcC0AXKhqg9Gj4zZIaUS4Mzq9VVECWVqG9KZpwZY_4ZA2k2pDCPzxHl3J20ByJHR5LlgOkYl-6IfgY0aewvm7cmb2sDvcGKdnwdzuYpcz4VQW64T5cZzaTK6uQKdvPIK-6GVZvc6aYXpJb8ap_edRgO0AuHwiqsfmcSC5veFeBtUtqKw6oWqPPxczU0c82vDdit4lW1UlzGxABgwYLrSiT933QNFeRyQzDwY_FkMsbouynWcJhVVJFfX6mqLS3lOw4u1mc28xlNRM1w0WEN09aEqKpRRs6Cg_xk2bkO3bKfifM2sCxkKjv8b67LcVJAMS8WumW6Canj3fJLqVNxUNcb`;
      // const searchUrl = `https://mobile.yangkeduo.com/proxy/api/search?pdduid=6722159943&item_ver=lzqq&source=search&search_met=history&track_data=refer_page_id,10015_1589511142464_witajgdave%3Brefer_search_met_pos,4&list_id=OirB0OgvnQ&sort=default&filter=&q=%E6%B4%97%E8%A1%A3%E5%87%9D%E7%8F%A0&page=2&size=50&flip=20%3B5%3B0%3B0%3B06aff68f-d5b0-404d-874d-5411136c86da&anti_content=0aoAfxvUONcYq9daFy8djsPo4d749vg1UjXfg3maBktdncFpQc6n01ycJ1masy4UqVndM7KsTRgCR9zh9GZ2m0_ZIwDGMaiYMAiLaqGm1m0T2A4u89pum65Ly8T9btRfeN8oeJ1ivKxPSUUzrUVA9D7pwuYWU6oTbK8WrS2ivtzk4nG66ejJBGifj-kHh3C3LUPYJaIG_OcsqaA4_Y_cvbqvUvfdQs3FpvkYcpea3jYJtjMiSJ3a4KyveiS93TlGnz8vAt1Ns5y7ezXyE6w8RKq8CwnaktsF3wyP31j7JOvs76hhOr7eeltSheThifq7CdQE1zSQDxv_8DG9bJsuAsw_S5Ld4bER-RmNHEQcjMHPmn9uS2HT-jgg0kaCoX9MH9H3EPuiExNDi9npQUIeB6Gms8HEHcaGB1N8YeXCb1l97So4DhCgT2hEeJKq9VOgbOqnjEw4J-nbZw-VnCjE5ByTofjJpG1O2PDfOB0uYcbkTpzHl6yVuZUzmeYzqldRzFkaBfutbmp2w-kmkwPoms6xKj00bw2zzerxHlqOnsOxNdHwNURlbFmM2r1zDICxZmAGm_2XUS1U7luPX8THPBaVUx1WBsqv17DB0ZgDDYRtjn_B2nwGBAMX8UtBKxFfr_rQ-30WloGVyNWJc7FM7_h-MO8lWU3Hx-wDZ6urp-trPjahCKBu0pAGQlIEbr94yeqRpNRs6CtxNzAJbS-HZMssMCfjAKsnDqjVjQp5gbhKKi6YRlI48g3cQzrhJ0vjKJ`;
      console.log(searchUrl);
      try {
        let data = await util.httpRequest(ctx, searchUrl, query.headers);
        let pItems = data.items;
        // 测试代码
        // let pItems = items;
        const productList = util.getProductList(pItems);
        resData.code = 200;
        resData.list = productList;
        resData.reqParams = `关键词:${query.q}; 爬取条数:${query.size}; 排序规则:${query.sort}`;
        await ctx.render('home/alibaba.tpl', resData);
      } catch (e) {
        resData.code = 0;
        resData.list = [];
        resData.msg = JSON.stringify(e);
        resData.reqParams = `关键词:${query.q}; 爬取条数:${query.size}; 排序规则:${query.sort}`;
        await ctx.render('home/alibaba.tpl', resData);
      }
    }
  }
}

module.exports = HomeController;
