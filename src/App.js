import React, { Component } from 'react';
import './App.scss';
import axios from 'axios';

const api = axios.create({
  baseURL: `http://localhost:3000/galleryImages/`
})

class App extends Component {
  constructor(){
    super();
    this.state = {
      data: {},
      isFetching: true,
      url: "",
    };
    this.getImgList();
  }

  getImgList = async () => {
    api.get('/').then(resp => {
      this.setState({data: resp.data, isFetching: false});
    })
  }

  changeHandler = e => {
    this.setState({url: e.target.value});
  }

  submitHandler = async e => {
    e.preventDefault();
    if (this.state.url === "") {
      alert("Введите URL адрес");
    }
    else {
      await api.post('/', {url: this.state.url, width: "", height: ""});
      this.setState({url: ""});
      this.getImgList();
    }
  }

  delImg = async (id) => {
    await api.delete(`/${id}`);
    this.getImgList();
  }

  render() {
    const { isFetching, url } = this.state;
    if (isFetching) return <div>...Loading</div>;
    return (
        <div className="wrapper">
          <div className="container">
            <div className="upload">
              <div className="upload__content">
                <h1>Галерея изображений</h1>
                <form className="form-upload" onSubmit={this.submitHandler}>
                  <input className="upload__input" value={url} onChange={this.changeHandler} placeholder="URL-адрес картинки"/>
                  <button className="upload__button" type="submit">Загрузить</button>
                </form>
              </div>
            </div>
            <div className="content">
              <div className="content__gallery">
                {this.state.data.map( item => <div key={item.id}><img src={item.url} alt=""/><button className="content__button" onClick={() => this.delImg(item.id)}>X</button></div>)}
              </div>
            </div>
          </div>
        </div>
    )
  }
}

export default App;
