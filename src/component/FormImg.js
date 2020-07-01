import React, { Component } from 'react';
import axios from 'axios';

class FormImg extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: "",
        }
    }

    changeHandler = e => {
        this.setState({url: e.target.value})
    }
    
    submitHandler = e => {
        e.preventDefault();
        axios.post(`http://localhost:3000/galleryImages`, this.state);
        this.setState({url: ""});
    }

    render() {
        const { url } = this.state;
        return (
            <div className="upload">
              <div className="upload__content">
                <h1>Галерея изображений</h1>
                <form className="form-upload" onSubmit={this.submitHandler}>
                  <input className="upload__input" value={url} onChange={this.changeHandler} placeholder="URL-адрес картинки"/>
                  <button className="upload__button" type="submit">Загрузить</button>
                </form>
              </div>
            </div>
        )
    }
}

export default FormImg;