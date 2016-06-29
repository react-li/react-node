import React, {Component, PropTypes} from 'react';
import ReactDOM, {render} from 'react-dom';
import {Provider} from 'react-redux';
import { Router, hashHistory } from 'react-router';

import routes from './Config/Route'; //路由配置
import store from './Config/Store';


import 'normalize.css'; //重置浏览器默认样式
import 'layout-flex'; //flex布局
import './Style/style.less'; //加载公共样式
import './Iconfont/iconfont.css'; //字体图标

store.subscribe(function () {
    // console.log(store.getState());
});

render(
    <Provider store={store}>
       <Router routes={routes} history={hashHistory} />
    </Provider>,
    document.getElementById('root')
);