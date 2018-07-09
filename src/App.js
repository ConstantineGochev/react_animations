import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import  FlipMove  from 'react-flip-move'
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';

const SortableItem = SortableElement(({value}) => <li>{value}</li>);

const SortableList = SortableContainer(({items}) => {
  return (
    <ul>
      {items.map((value, index) => (
        <SortableItem key={`item-${index}`} index={index} value={value.title} />
      ))}
    </ul>
  );
});

class App extends Component {
  constructor(props){
    super()
    this.state = {
      yachts: [{title:'Lagoon',id:3},{title:'Bavaria',id:1},{title:'Jeneao',id:2},{title:'Lagoon',id:4},{title:'Beneteaou',id:5},{title:'Dufuour',id:6}]
    }
    this.sort_yachts = this.sort_yachts.bind(this)
  }
  render_yachts(){

     return this.state.yachts.map((y) => {
       return (
         <li style={{fontSize:'15px',marginBottom:'5px'}}key={y.id}>{y.title}</li>
        )
      })
    }
    onSortEnd = ({oldIndex, newIndex}) => {
      this.setState({
        yachts: arrayMove(this.state.yachts, oldIndex, newIndex),
      });
    };
  sort_yachts(){
 
    // const sorted = this.state.yachts.sort((a,b) => {
    //   if(a.title < b.title) return -1
    //   if(b.title < a.title) return 1
    //   return 0
    // })

    //random shuffle
    let counter = this.state.yachts.length;
    let array = this.state.yachts
    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        let index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    this.setState({
      yachts:array,
    })
  }
  render() {
    return (
      <div style={{ position: 'relative',width: '200px',padding:'0',left: '40%' }}>
         <h3>Animated List</h3>
    <FlipMove typeName="ul" > 
           {this.render_yachts()}
    </FlipMove>
         
         <button style={{marginLeft:'25px'}} onClick={this.sort_yachts}><img src={logo} />Shuffle</button>
         <h4>Drag and Drop these:</h4>
         <SortableList items={this.state.yachts} onSortEnd={this.onSortEnd} />
      </div>
    );
  }
}

export default App;
