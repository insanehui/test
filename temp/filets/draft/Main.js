import React, { PureComponent, PropTypes} from 'react'

import _ from 'lodash'
import cx from 'classnames'
import {Map as M} from 'immutable'
import { connect } from 'react-redux'

import {css, border as bd, hsl, bg, flex, } from './utils/cssobj.js'
import Mysql from './widgets/Mysql.js'
import Storage from './widgets/Storage.js'
import models from './kit_type.js'
import uuid from 'uuid/v1' 

const S = css({
  main: {
    ...bd,
    ...bg(hsl(178, 32, 75)),
    ...flex(1),
  },

  todraw: {
    cursor: "crosshair",
  },

  grab : {
    cursor : 'grab',
  },

  grabbing : {
    cursor : 'grabbing',
  },

})

// 图元的映射
const widgetMap = {
  mysql : Mysql,
  storage : Storage,
}

// 图元的宽度，后续考虑弄到某个配置里去
const KIT_WIDTH = 100
const KIT_HEIGHT = 100
const SLOT_HEIGHT = 10
const SLOT_WIDTH = 10

// 用于生成一排slot的位置
function posGen(x, y, n, type) {
  // TODO: 后面可以考虑让其分担更多render里的细节
  // type: 0 in, 1 out

  const step = 20
  let i = 0
  // 起始相对位置
  const x0 = (KIT_WIDTH - (step * (n-1))) / 2
  const y0 = type ? -SLOT_HEIGHT : KIT_HEIGHT-SLOT_HEIGHT

  // 起始绝对位置
  const rx = x + x0
  const ry = y + y0

  return () => {
    return {
      x : rx + (step * i++),
      y : ry,
    }
  }
}

// slot坐标的修正
function slot_top_left_to_center({x, y}) {
  return {
    x : x + (SLOT_WIDTH / 2),
    y : y + (SLOT_HEIGHT / 2),
  }
}

class Main extends PureComponent {

  constructor(p) {
    super(p)
  
    this.newItem = this.newItem.bind(this)
  }

  state = {

    kits : M({ // 图元数据, immutable
      m1 : {
        type : 'mysql',
        x : 150,
        y : 100,
      },
      m2 : {
        type : 'mysql',
        x : 300,
        y : 100,
      },
      s1 : {
        type : 'storage',
        x : 100,
        y : 240,
      },
      s2 : {
        type : 'storage',
        x : 400,
        y : 240,
      },
    }),

    links : {
      l1 : {
        from : 's1',
        // from_port: // 如果缺省，则为唯一的"out"
        to : 'm1',
        to_port: 'volumn',
      },
      l2 : {
        from : 's2',
        to : 'm2',
        to_port: 'volumn',
      },
    },

    mode : 'normal', // 当前的操作状态，可选值 'grab'

    grabbed_kit: null, // 当前抓住的图元，为其id
  }

  // 用于在拖动时正确计算图元的坐标
  drag_delta = {
    dx : null,
    dy : null,
  }

  hasBrush() {
    let p = this.props
    return !_.isNull(p.brush) 
  }

  // 点下一个新的图元
  newItem(e) {
    const p = this.props

    if ( !this.hasBrush() ) {
      return
    }

    console.log("draw:" + p.brush)

    const {top, left} = this.refs.svg.getBoundingClientRect()
    const x = e.clientX - left
    const y = e.clientY - top

    p.newItem(x, y)
  }

  release() {
    const p = this.props 
    if( p.brush )
      return

    p.release()
  }

  grab(kid, e) {
    const p = this.props
    const kit = p.kits.get(kid)
    
    this.drag_delta = {
      dx : kit.x - e.clientX,
      dy : kit.y - e.clientY,
    }

    p.grab(kid)
  }

  ifdrag(e) {
    const p = this.props
    
    // 只有grab状态才进行拖动
    if ( p.mode !== 'grab' ) {
      return
    }

    // 取到对应图元的坐标
    const kid = p.grabbed_kit
    const kit = p.kits.get(kid)

    // 更新坐标
    const x = e.clientX + this.drag_delta.dx
    const y = e.clientY + this.drag_delta.dy

    p.moveTo(x, y)

  }

  render() {
    const p = this.props

    let Items = []
    p.kits.forEach((item, id) => {
      const Kit =  widgetMap[item.type] // 取到组件类
      Items.push(<Kit key={id} x={item.x} y={item.y} className={S.grab} onMouseDown={this.grab.bind(this, id)} />)
    })

    // 插口组
    let slot_coords = {
      // 形如：
      // m1 : {
      //  in : {
      //    xx {
      //      x : 100,
      //      y : 20,
      //    }
      //  }
      // }
    } // 插口坐标缓存

    let Slots = []
    p.kits.forEach((item, id ) => {

      let model = models[item.type] // 取到逻辑model

      let gp = {
        stroke : 'black',
        strokeWidth : 0.5,
      }

      // 输入插口
      let Ins = (()=>{

        const gen = posGen(item.x, item.y, _.size(model.in), 0)

        slot_coords[id] = slot_coords[id] || {}
        let xys = slot_coords[id].in = {}

        return _.map(model.in, ( type, key) => {

          let rid = `slot_${id}_${key}`

          const xy = gen() // 取到当前插口坐标

          xys[key] = xy // 缓存

          return <g key={rid} {...gp}>
            <rect id={rid} width={10} height={10} fill='chocolate' {...xy} />
            <text {...xy} visibility="hidden">
              {key}
              <set attributeName="visibility" from="hidden" to="visible" begin={`${rid}.mouseover`} end={`${rid}.mouseout`} />
            </text>
          </g>
        })
      })()

      // 输出插口
      let Outs = (()=>{

        slot_coords[id] = slot_coords[id] || {}
        let xys = slot_coords[id].out = {}

        let outs = model.out

        if ( !_.isObject(outs) ) {
          outs = { out : outs }
        }

        const gen = posGen(item.x, item.y, _.size(outs), 1)

        return _.map(outs, ( type, key) => {
          let rid = `slot_${id}_${key}`
          const xy = gen()

          xys[key] = xy // 缓存

          return <g key={rid} {...gp}>
            <rect id={rid} width={10} height={10} fill='cornsilk' {...xy} />
            <text {...xy} visibility="hidden">
              {key}
              <set attributeName="visibility" from="hidden" to="visible" begin={`${rid}.mouseover`} end={`${rid}.mouseout`} />
            </text>
          </g>
        })

      })()

      Slots =  [...Slots, ...Ins, ...Outs]

    })

    let Links = _.map(p.links, (item, i ) => {
      const from = slot_top_left_to_center(slot_coords[item.from].out[item.from_port || 'out'])
      const to = slot_top_left_to_center(slot_coords[item.to].in[item.to_port])
      
      let l =  {
        x1 : from.x,
        y1 : from.y,
        x2 : to.x,
        y2 : to.y,
        key : i,
      }

      return <line {...l} stroke="black" />
    })

    return <svg className={cx(S.main, {
      [S.todraw] : this.hasBrush()
    })} 
      ref='svg'
      onClick={this.newItem} onMouseUp={this.release.bind(this)} onMouseMove={this.ifdrag.bind(this)}
    >
      {Items}
      {Links}
      {Slots}
    </svg>
  }
}

const { string, func, any } = PropTypes
Main.propTypes = {

  brush : string,
  kits : any,
  links : any,
  mode : string, 
  grabbed_kit : any, 

  newItem : func, // p.newItem(x, y)
  grab : func, // p.grab(kid)
  moveTo : func, // p.moveTo(x, y)
  release : func,

}

const sm = (s) => {
  return {
    brush : s.get('brush'),
    kits : s.get('kits'),
    links : s.get('links'),
    mode : s.get('mode'),
    grabbed_kit : s.get('grabbed_kit'),
  }
}

const dm = (d) => {
  return {

    newItem : (x, y)=>{
      d({ 
        type: 'new_item',
        x, y,
      })
    },

    grab : (kid)=>{
      d({ type: 'grab', kid})
    },

    moveTo : (x, y)=>{
      d({ type: 'move_to', x, y})
    },

    release : () => {
      d({ type: 'release' })
    }

  }
}

export default connect(sm, dm)(Main);
