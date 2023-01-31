import React from 'react';
import axios from 'axios';

class BookForm extends React.Component {

  state = {
    title: '',
    author: '',
    genre: '',
    year: '',
    book:''
  }

  handleChange = ({ target }) => {
    const { name, value } = target
    this.setState({ [name]: value })
  }


  submit = (e) => {
    e.preventDefault();

    const payload = {
      title: this.state.title,
      author: this.state.author,
      genre: this.state.genre,
      year: this.state.year,
      book: this.state.book,
    }

    axios({
      url: 'http://localhost:5000/api/books',
      method: 'POST',
      data: payload
    })
      .then(() => {
        console.log('Data has been sent to the server');
        this.resetUserInputs()
      })
      .catch(() => {
        console.log('Internal server error');
      })
  }

  resetUserInputs = () => {
    this.setState({
      title: '',
      author: '',
      genre: '',
      year: '',
      book:''
    });
  };
  render() {

    console.log('State: ', this.state);

    return(
      <div className="app container-xl align-items-center text-center" >
        <h2>Dodaj książkę do biblioteki</h2>
        <form onSubmit={this.submit}>

          <div className="form-group">
            <input className="text-center"
              type="text"
              name="title"
              placeholder="Podaj tytuł"
              value={this.state.title}
              onChange={this.handleChange}
            />
          </div>

          <div className="form-group">
            <input className="text-center"
              type="text"
              name="author"
              placeholder="Podaj Autora"
              value={this.state.author}
              onChange={this.handleChange}
            />
          </div>

          <div className="form-group">
            <input className="text-center"
              type="text"
              name="genre"
              placeholder="Wybierz Gatunek"
              value={this.state.genre}
              onChange={this.handleChange}
            />
          </div>

          <div className="form-group">
            <input className="text-center"
              type="number"
              name="year"
              placeholder="Podaj datę wydania"
              value={this.state.year}
              onChange={this.handleChange}
            />
          </div>

          <div className="form-group">
            <input className="text-center"
              type="file"
              name="book"
              placeholder="Dodaj fragment książki"
              accept=".pdf"
              value={this.state.book}
              onChange={this.handleChange}
            />
          </div>

          <button>Submit</button>
        </form>
        <p>Nie działa niestety, coś się wysypało i barkuje czasu aby naprawić, da się dodawać książki przez backend</p>
      </div>
    );
  }
}


export default BookForm;