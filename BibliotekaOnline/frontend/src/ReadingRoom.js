import React from 'react';
import axios from 'axios';
import './App.css';
import bookImage from './uploads/book.jpg'


class ReadingRoom extends React.Component {

  state = {
    booksID: [],
    book: []
  };

  componentDidMount = () => {
    this.getBooks()
  };


  getBooksID = async () => {

    let config = {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem("token")
      }
    }

    await axios.get('http://localhost:5000/api/users/userBooks',config)
      .then((response) => {
        // data table
        const data = response.data;
        this.setState({ booksID: data.books })
      })
      .catch(() => {
        alert('Error retrieving data!!!');
      });
  }

getBooks = async () => {

  await this.getBooksID()

  let bookShelf = []

  for (let i = 0; i < this.state.booksID.length; i++) {
    await axios.get(`http://localhost:5000/api/books/book/${this.state.booksID[i]}`)
    .then((response) => {
      bookShelf[i] = response.data;
    })
    .catch(() => {
      alert('Error retrieving data!!!');
    });
  }

  this.setState({ book: bookShelf })
}


  displayBooks = (books) => {
    if (!books.length) return (
      <p className='p-2'>Nie posiadasz żadnej książki na swojej liście, aby zacząć czytać zapraszamy najpierw do Biblioteki</p>
    )
    
    return books.map((book, index) => (
      <div key={index} className="card col-3">
        <img className="card-img-top" src={bookImage} alt="Book"/>
        <div className="card-body">
          <h5 className="card-title">{book.title}</h5>
          <p className="card-text">{book.author}</p>
          <p className="card-text">{book.genre} {book.year}</p>
          <a rel="noreferrer" target="_blank" href={require(`./uploads/${book.book}`)} className="btn btn-primary">Zacznij Czytać</a>
        </div>
      </div>
    ))
  };


  render() {

    return(
      <div className="app text-center align-items-center justify-content-center container-xxl ">
        <h2>Czytelnia</h2>
        <div className="row align-items-center justify-content-center">
          {this.displayBooks(this.state.book)}
        </div> 
      </div>
    );
  }
}

export default ReadingRoom;