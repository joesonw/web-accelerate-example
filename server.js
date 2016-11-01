/*
* @Author: Joesonw
* @Date:   2016-11-01 13:29:00
* @Last Modified by:   Qiaosen Huang
* @Last Modified time: 2016-11-01 15:36:10
*/

'use strict';
const fs = require('fs');
const path = require('path');
const koa = require('koa');

const app = koa();

app.use(function* () {
    const file = path.resolve(__dirname, path.resolve('dist', this.path.slice(1) || 'index.html'));
    const headers = this.headers;

    let ifLastModified = this.headers['if-modified-since'];
    if (ifLastModified) {
        ifLastModified = new Date(ifLastModified);
    }

    try {
        const stat = yield cb => fs.stat(file, cb);
        const now = Date.now();
        if (ifLastModified &&
            file !== path.resolve(__dirname, path.resolve('dist/index.html'))) {
            if (ifLastModified >= stat.mtime) {
                this.status = 304;
                return; 
            }
        }
        const content = yield cb => fs.readFile(file, cb);
        this.body = content;
        this.type = path.extname(file).slice(1);
        this.status = 200;
        this.set('Last-Modified', stat.mtime);

    } catch (e) {
        this.status = 404;
    }
});

app.listen(process.env.PORT || 3000);