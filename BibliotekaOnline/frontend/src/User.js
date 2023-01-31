import React from 'react';
import axios from 'axios';
import './App.css';

class User extends React.Component {

  state = {
    user:''
  };

  componentDidMount = () => {
    this.GetUser();
  };

  GetUser = () => {
    let config = {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem("token")
      }
    }
    axios.get( 
        'http://localhost:5000/api/users/user',
        config
      )
      .then( ( response ) => {
        const data = response.data;
        this.setState({ user: data });
      } )
      .catch(() => {
        alert('Error retrieving data!!!');
      })
  }

  displayUser = (user) => {

    return (
      <>
      <h1>Profil</h1>
      <p>Nazwa użytkownika: {user.username}</p>
      <p>Email: {user.email}</p>
      </>
    )
  };

  render() {

    return(
      <div className="app text-center align-items-center justify-content-center container-xxl ">
        <div className="row align-items-center justify-content-center">
          {this.displayUser(this.state.user)}
        </div>
      </div>
    );
  }
}


export default User;