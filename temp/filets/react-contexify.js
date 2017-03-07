// React 
// react-contexify 使用示例
/* eslint-disable react/jsx-pascal-case */
import React from 'react'
import { render } from 'react-dom'
import _ from 'lodash'

import './utils/css_preset.js'

import { ContextMenu, Item, Separator } from 'react-contexify';
import { ContextMenuProvider, menuProvider } from 'react-contexify';
import 'react-contexify/dist/ReactContexify.min.css'

function onClick(item, target) {
  // item is the item component on which you clicked. You can access all the props
  // 好像是对应菜单项的react实例？而非静态react element
  console.log(item);

  // targe是触发菜单的html dom元素
  console.log(target);
}

// 创建菜单组件。该组件是可以单个实例被多处共享的
const MyAwesomeMenu = () => {
  return (
    <ContextMenu id='menu_id'>
      <Item label="Add" icon="fa fa-plus" onClick={onClick} />
      <Item label="Remove" icon="fa fa-trash" onClick={onClick} />
      <Separator/>
      <Item label="Paste" icon="fa fa-clipboard" disabled />
    </ContextMenu>
  );
};


const Hodor = () => <div>Hodor</div>;
const Cersei = () => <div>Cersei</div>;
const Aria = () => <div>Aria</div>;

// 使用菜单方法一：包裹一层
const CerseiWithContextMenu = () => {
    return (
        <ContextMenuProvider id="menu_id">
            <Cersei />
        </ContextMenuProvider>
    )
};

// 使用菜单方法二：柯里化成高阶组件。但高阶化之后，不能传参数了？
const addContextMenu = menuProvider('menu_id'); 
const HodorWithContextMenu = addContextMenu(Hodor);
const AriaWithContextMenu = addContextMenu(Aria);
const Div = addContextMenu('div')

const App = () => {
    return(
        <div>
            <CerseiWithContextMenu />
            <HodorWithContextMenu />
            <AriaWithContextMenu />
            <MyAwesomeMenu/>
            {/* 下面这个不能工作 */}
            <Div style={{height: 100}} >haha</Div> 
        </div>
    )
}


render(<App />, document.getElementById('root'))

