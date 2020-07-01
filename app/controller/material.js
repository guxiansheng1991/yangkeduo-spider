const Controller = require('egg').Controller;
const Util = require('../common/util');
const superagent = require('superagent');
const request = require("request");
const cheerio = require('cheerio');
const fs = require('fs');
const url = require('url');

class Material extends Controller {
    async index() {
        await this.ctx.render('material/material.tpl');
    }
    // 保存mzitu素材图片
    async mzitu() {
        const util = new Util();
        const $ = await util.getHtmlData('https://www.mzitu.com/xinggan/');
        console.log($('img').attr('src'));
    }

    // 保存虎扑图片
    async hupu() {
        const imgArray = [];
        const hupuUrl = 'https://bbs.hupu.com/selfie-2';
        const htmlText = await this.getHtmlTextData(hupuUrl);
        let $ = null;
        if (!htmlText) {
            this.ctx.body = '暂无数据';
            return;
        }
        $ = cheerio.load(htmlText);
        const linkArray = $('.titlelink>a:first-child');
        linkArray.each(async (index, element) => {
            let $element = $(element);
            let href = url.resolve(hupuUrl, $element.attr('href'));
            const arr = await this.getDetailImg(href);
            imgArray.push(arr);
        });
        this.ctx.body = '数据数据已保存, 请查看文件夹';
    }

    // 获取详情图片
    async getDetailImg(url) {
        return new Promise(async (resolve, reject) => {
            const htmlText = await this.getHtmlTextData(url);
            let $ = null;
            if (!htmlText) {
                reject([]);
            }
            $ = cheerio.load(htmlText);
            const title = $('.bbs-hd-h1>h1').attr('data-title');
            const contentimgs = $('.quote-content img');
            for (let i = 0; i < contentimgs.length; i++) {
                const item = $(contentimgs[i]);
                this.writeImg(item.attr('src'), 'D:/下载/test', `${title}-${i}.jpg`);
            }
            resolve(contentimgs);
        });
    }

    // 获取html
    async getHtmlTextData(url) {
        return new Promise((resolve, reject) => {
            superagent
                .get(url)
                .end((err, res) => {
                    if (err) {
                        console.error(err);
                        reject('');
                    }
                    if (res.text) {
                        resolve(res.text);
                    } else {
                        reject('');
                    }
                });
        });
    }

    // 将文件写入文件系统
    writeImg(imgUrl, myDirPath, filename) {
        return new Promise((resolve, reject) => {
            const writeStream = fs.createWriteStream(`${myDirPath}/${filename}`);
            const readStream = request(imgUrl);
            readStream.pipe(writeStream);
            readStream.on('end', function () {
                console.log('文件下载成功', imgUrl, `${myDirPath}/${filename}`);
            });
            readStream.on('error', function (err) {
                console.log('错误信息:', err, imgUrl, `${myDirPath}/${filename}`);
                reject(`文件下载错误,${myDirPath}/${filename}`);
            });
            writeStream.on('finish', function (data) {
                console.log('文件写入成功', imgUrl, `${myDirPath}/${filename}`);
                resolve(`保存成功, ${imgUrl}/${myDirPath}/${filename}`);
                writeStream.end();
            });
        });
    }
}

module.exports = Material;