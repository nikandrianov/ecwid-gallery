import React, { Component } from 'react';
import './App.scss';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: {},
      isFetching: true,
    }
  }

  componentDidMount() {
    fetch(`gallery-images.json`)
      .then(resp => resp.json())
      .then(result => this.setState({data: result, isFetching: false }))
  }

  showImg () {
    return this.state.data.galleryImages.map( (item,index) => <div key={index}><img src={item.url} alt=""/></div>)
  }

  render() {
    const { isFetching } = this.state;
    if (isFetching) return <div>...Loading</div>;
    return (
        <div className="wrapper">
          <div className="container">
            <div className="upload">
              <div className="upload__content">
                <h1>Галерея изображений</h1>
                <form className="form-upload">
                  <input className="upload__input" placeholder="URL-адрес картинки"/>
                  <button className="upload__button">Загрузить</button>
                </form>
              </div>
            </div>
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
