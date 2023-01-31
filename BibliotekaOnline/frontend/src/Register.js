import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

class Register extends React.Component {

    state = {
        username: '',
          password: '',
          password2: '',
          email: ''
      }
    
      handleChange = ({ target }) => {
        const { name, value } = target
        this.setState({ [name]: value })
      }
    
    
      submit = (e) => {
        e.preventDefault();
    
        const payload = {
          username: this.state.username,
          password: this.state.password,
          email: this.state.email
        }
    
        axios({
          url: 'http://localhost:5000/api/users',
          method: 'POST',
          data: payload
        })
          .then(() => {
            this.resetUserInputs()
            window.location = "/login"
          })
          .catch((error) => {
            alert("Konto o takim emailu już istnieje")
          })
      }
    
      resetUserInputs = () => {
        this.setState({
          username: '',
          password: '',
          password2: '',
          email: ''
        });
      };

    render() {
        return(
    <>
    <div className='container-xl align-items-center text-center'>
    <h1>Zarejestruj się</h1>
        <form onSubmit={this.submit}>

        <div className="form-group">
            <input className='text-center'
                type="text"
                name="username"
            placeholder="Podaj nazwę użytkownika"
            value={this.state.username}
            onChange={this.handleChange}
            required
            />
        </div>

        <div className="form-group">
            <input className='text-center'
                type="text"
                name="email"
            placeholder="Podaj email"
            value={this.state.email}
            onChange={this.handleChange}
            required
            />
        </div>

        <div className="form-group">
            <input className='text-center'
                type="password"
                name="password"
            placeholder="Podaj hasło"
            value={this.state.password}
            onChange={this.handleChange}
            required
            />
        </div>

        <div className="form-group">
            <input className='text-center'
            type="password"
            name="password2"
            placeholder="Powtórz hasło"
            value={this.state.password2}
            onChange={this.handleChange}
            required
            />
        </div>


        <button>Zarejestruj</button>
        </form>
    </div>
    <div className='container-xl align-items-center text-center'>
        <h1>Posiadasz już konto?</h1>
        <Link to="/login">
            <button className='btn-lg' type='button'>
                Zaloguj się
            </button>
        </Link>
    </div>
    </>
        )
    }
}

export default Register