import React from 'react';
import axios from 'axios';
import './App.css';
import bookImage from './uploads/book.jpg'


class Library extends React.Component {

  state = {
    books: [],
    preBooks:[]
  };

  componentDidMount = () => {
    this.getBooks();
    this.getPreBooks();
  };

  componentDidUpdate( prevState) {
    if (prevState.preBooks !== this.state.preBooks && this.state.preBooks.length > 0) {
      let config = {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem("token")
        }
      }
       axios.put( 
          'http://localhost:5000/api/users/user',
          {
            "books": this.state.preBooks
          },
          config
        )
        .catch(() => {
          alert('Error retrieving data!!!');
        })

    }
  }

  getBooks = () => {

    axios.get('http://localhost:5000/api/books')
      .then((response) => {
        // data table
        const data = response.data;
        this.setState({ books: data });
      })
      .catch(() => {
        alert('Error retrieving data!!!');
      });
  }

  getPreBooks = async () => {
    let config = {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem("token")
      }
    }
    await axios.get( 
        'http://localhost:5000/api/users/user',
        config
      )
      .then( ( response ) => {
        const data = response.data;
        this.setState({ preBooks: data.books });
      } )
      .catch(() => {
        alert('Error retrieving data!!!');
      })
  }

  prenumeruj = async (e) => {

    e.preventDefault();

    if(this.state.preBooks.includes(e.target.id)){
      alert("Książka jest już prenumerowana")
    }else{
      this.setState({ preBooks: [...this.state.preBooks, e.target.id]})
    }

  }

  displayBooks = (books) => {

    if (!books.length) return null;
    return books.map((book, index) => (
      <div key={index} className="card col-3">
        <img className="card-img-top" src={bookImage} alt="Book"/>
        <div className="card-body">
          <h5 className="card-title">{book.title}</h5>
          <p className="card-text">{book.author}</p>
          <p className="card-text">{book.genre} {book.year}</p>
          <a id={book._id} onClick={e => this.prenumeruj(e)} className="btn btn-primary">Prenumeruj książkę</a>
        </div>
      </div>
    ));
  };

  render() {

    return(
      <div className="app text-center align-items-center justify-content-center container-xxl ">

      <div class="jumbotron jumbotron-fluid">
        <div class="container">
          <h1 class="display-4">Biblioteka</h1>
          <p class="lead">Biblioteka online zbierająca dzieła najlepszych autorów z całego świata i 
          dostarczająca je w łatwych w użyciu plikach.</p>
        </div>
      </div>
      <h2 class="display-5">Księgozbiór</h2>
        <div className="row align-items-center justify-content-center">
          {this.displayBooks(this.state.books)}
        </div>
      </div>
    );
  }
}


export default Library;