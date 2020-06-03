'use strict';

const Controller = require('egg').Controller;
const Util = require('../common/util');
const request = require("request");
const fs = require("fs");
const path = require('path');
const puppeteer = require('puppeteer');

class SaveImgController extends Controller {
    async alibaba() {
        await this.ctx.render('alibaba/alibaba.tpl');
    }

    async index() {
        // 参数
        const { ctx } = this;
        const query = ctx;
        console.log(query);

        // this.creatDirMethod('D://test1/test2/test3');
        // this.writeImg('https://cbu01.alicdn.com/img/ibank/2020/932/159/14323951239_1707140344.jpg', 'D://test1/test2/test3', '1.jpg')

        ctx.body = [1,2,3];
    }

    // 创建文件夹
    creatDirMethod(myPath) {
        let flag = false;
        if (fs.existsSync(myPath)) {
            flag = true;
        } else {
            if (this.creatDirMethod(path.dirname(myPath))) {
                fs.mkdirSync(myPath);
                flag = true;
            }
        }
        return flag;
    }

    // 将文件写入文件系统
    writeImg(imgUrl, myDirPath, filename) {
        return new Promise((resolve, reject) => {
            let filename = `test.png`;
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

module.exports = SaveImgController;
