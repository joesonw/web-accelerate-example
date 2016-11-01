/*
* @Author: Joesonw
* @Date:   2016-11-01 11:46:52
* @Last Modified by:   Joesonw
* @Last Modified time: 2016-11-01 11:54:50
*/

import React from 'react';
import ReactDOM from 'react-dom';
import css from 'react-css-modules';

import p1 from 'resources/1.jpg';
import p2 from 'resources/2.jpg';
import p3 from 'resources/3.jpg';
import p4 from 'resources/4.jpg';
import p5 from 'resources/5.jpg';
import p6 from 'resources/6.jpg';

import styles from './index.scss';

@css(styles)
class Index extends React.Component {
    render() {
        return (<div>
            <img styleName="image" src={p1} />
            <img styleName="image" src={p2} />
            <img styleName="image" src={p3} />
            <img styleName="image" src={p4} />
            <img styleName="image" src={p5} />
            <img styleName="image" src={p6} />
        </div>);
    }
}

ReactDOM.render(<Index />, document.getElementById('container'));