/*
 * react motion在图片轮播中的应用
 * > 演示 Motion的嵌套
 */
import React from 'react';
import { render } from 'react-dom'

import {Motion, spring} from 'react-motion';
import './index.css'

const springSettings = {stiffness: 170, damping: 26};
const NEXT = 'show-next';

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [[500, 350], [800, 600], [800, 400], [700, 500], [200, 650], [600, 600]], // 写死每个图片的分辨率，这其实是常量
      currPhoto: 0, 
    };
  };

  handleChange = ({target: {value}}) => {
    this.setState({currPhoto: value});
  };

  clickHandler = (btn) => {
    let photoIndex = btn === NEXT ? this.state.currPhoto+1 : this.state.currPhoto-1;

    photoIndex = photoIndex >= 0 ? photoIndex : this.state.photos.length - 1;
    photoIndex = photoIndex >= this.state.photos.length ? 0 : photoIndex;

    this.setState({
      currPhoto: photoIndex
    })
  };

  render() {
    const {photos, currPhoto} = this.state;
    const [currWidth, currHeight] = photos[currPhoto];

    const widths = photos.map(([origW, origH]) => currHeight / origH * origW);

    const leftStartCoords = widths
      .slice(0, currPhoto)
      .reduce((sum, width) => sum - width, 0);

    let configs = [];

    // 根据state得到每张图片的位置及尺寸
    photos.reduce((prevLeft, [origW, origH], i) => {
      configs.push({
        left: spring(prevLeft, springSettings),
        height: spring(currHeight, springSettings),
        width: spring(widths[i], springSettings),
      });
      return prevLeft + widths[i];
    }, leftStartCoords);

    return (
      <div>
        <div>Scroll Me</div>
        <button onClick={this.clickHandler.bind(null, '')}>Previous</button>
        {/* tips: 使用html5提供的原生slider: type=range的input */}
        <input
          type="range"
          min={0}
          max={photos.length - 1}
          value={currPhoto}
          onChange={this.handleChange} />
        <button onClick={this.clickHandler.bind(null, NEXT)}>Next</button>
        <div className="demo4">
          <Motion style={{height: spring(currHeight), width: spring(currWidth)}}>
            {container =>
              // inner为图片的容器
              <div className="demo4-inner" style={container}>
                {configs.map((style, i) =>
                  <Motion key={i} style={style}>
                    {style =>
                      // 关键时刻，require拯救世界啊
                      <img className="demo4-photo" alt='' src={require(`./${i}.jpg`)} style={style} />
                    }
                  </Motion>
                )}
              </div>
            }
          </Motion>
        </div>
      </div>
    );
  };
}

render(<Demo />, document.getElementById('root'))
