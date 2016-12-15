import React, { Component } from 'react';
import Radium from 'radium';
import { border, ptr, bg, hsl } from './utils/cssobj.js'

const S = {
  main: {
    ...border,
    width: 150,
  },

  item: {
    ...border, ...ptr,
    height: 30,
  }
}

class ToolPanel extends Component {

  state = {
    data : [
    "按钮1",
    "按钮2",
    ],
    sel : null, // 当前选中的，缺省无
  }

  onClick(i) {
    this.setState({sel:i})
  }

  render() {
    let s = this.state
    return <div style={S.main}>
      {s.data.map( (v,i) => 
        <div key={i} style={[S.item, i === s.sel ? bg(hsl(178, 32, 75)) : null]} onClick={this.onClick.bind(this, i)}>
          {v}
        </div> 
      )}
    </div>
  }
}

export default Radium(ToolPanel);

