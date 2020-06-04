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
        const { inputPath, inputUrl, inputUrlHead } = ctx.request.query;

        const res = {
            detailImgList: [],
            headImgList: [],
            code: 0,
            msg: ''
        };

        // 详情页图片
        const detailImgPath = `${inputPath}/1688详情图`;
        this.creatDirMethod(detailImgPath);
        const detailImgUrlArray = inputUrl.split(',');
        let i = 0;
        const detailInterval = setInterval(async () => {
            if (i < detailImgUrlArray.length) {
                const ele = detailImgUrlArray[i];
                let saveImg = await this.writeImg(ele, detailImgPath, `${i}.jpg`);
                res.detailImgList.push(saveImg);
                i++;
            } else {
                clearInterval(detailInterval);
            }
        }, Math.random() * 2000 + 1000);

        // 头页图片
        const headImgPath = `${inputPath}/1688头图`;
        this.creatDirMethod(headImgPath);
        const headImgUrlArray = inputUrlHead.split(',');
        let j = 0;
        const headInterval = setInterval(async () => {
            if (j < headImgUrlArray.length) {
                const ele = headImgUrlArray[j];
                let saveImg = await this.writeImg(ele, headImgPath, `${j}.jpg`);
                res.headImgList.push(saveImg);
                j++;
            } else {
                clearInterval(headInterval);
            }
        }, Math.random() * 2000 + 1000);

        res.code = 200;
        ctx.body = res;
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
