/*
* @Author: Joesonw
* @Date:   2016-11-01 13:29:00
* @Last Modified by:   Qiaosen Huang
* @Last Modified time: 2016-11-01 16:04:10
*/

'use strict';
const fs = require('fs');
const path = require('path');
const koa = require('koa');

const app = koa();

app.use(function* () {
    const file = path.resolve(__dirname, path.resolve('dist', this.path.slice(1) || 'index.html'));

    try {
        const content = yield cb => fs.readFile(file, cb);
        this.body = content;
        this.type = path.extname(file).slice(1);
        this.status = 200;
        if (file !== path.resolve(__dirname, 'dist/index.html')) {
            this.set('Expires', new Date(Date.now() + 10* 365 * 86400 * 1000));
        }

    } catch (e) {
        this.status = 404;
    }
});

app.listen(process.env.PORT || 3000);