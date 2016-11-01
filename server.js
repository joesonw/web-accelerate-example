/*
* @Author: Joesonw
* @Date:   2016-11-01 13:29:00
* @Last Modified by:   Joesonw
* @Last Modified time: 2016-11-01 13:47:23
*/

'use strict';
const fs = require('fs');
const path = require('path');
const koa = require('koa');

const app = koa();

app.use(function* (next) {
    const file = this.path.slice(1) || 'index.html';
    try {
        const content = yield cb => fs.readFile(path.resolve('./dist', file), cb);
        this.body = content;
        this.type = path.extname(file).slice(1);
        this.status = 200;
    } catch (e) {
        this.status = 404;
    }
    yield next;
});

app.listen(process.env.PORT || 3000);