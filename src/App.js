import React, { Component } from 'react';
import './App.scss';
import axios from 'axios';
import FormImg from './component/FormImg';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: {},
      isFetching: true,
    }
  }

  componentDidMount() {
    // fetch(`gallery-images.json`)
    //   .then(resp => resp.json())
    //   .then(result => this.setState({data: result, isFetching: false }))
    axios.get(`http://localhost:3000/galleryImages`)
      .then(resp => this.setState({data: resp.data, isFetching: false}))
  }

  showImg () {
    return this.state.data.map( (item,index) => <div key={index}><img src={item.url} alt=""/></div>)
  }

  render() {
    const { isFetching } = this.state;
    if (isFetching) return <div>...Loading</div>;
    return (
        <div className="wrapper">
          <div className="container">
            <FormImg showImg={this.showImg(this.state.data)}/>
            <div className="content">
              <div className="content__gallery">
                {this.showImg()}
              </div>
            </div>
          </div>
        </div>
    )
  }
}

export default App;
