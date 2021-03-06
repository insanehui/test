import React, {Component} from 'react';
import {render, 
  // findDOMNode
} from 'react-dom';
import {SortableContainer, SortableElement, arrayMove} from './src/index.js';

@SortableElement
class SortableItem extends Component {
  render() {
    const {value} = this.props
    return <div style={{border:`1px solid gray`}}>{value}
      <button>按钮拖不动</button>
    </div>
  }
}

const SortableList = SortableContainer(({items}) => {
  return (
    <div style={{height:300, width:200, overflow:'auto'}} >
      {items.map((value, index) => (
        <SortableItem key={`item-${index}`} index={index} value={value} />
      ))}
    </div>
  );
});

class SortableComponent extends Component {
  state = {
    items: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6'
    ],
  };
  onSortEnd = ({oldIndex, newIndex}) => {
    this.setState({
      items: arrayMove(this.state.items, oldIndex, newIndex),
    });
  };
  render() {
    return <SortableList items={this.state.items} onSortEnd={this.onSortEnd} />;
  }
}

render(<SortableComponent/>, document.getElementById('root'));

