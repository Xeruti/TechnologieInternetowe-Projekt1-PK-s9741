import React from 'react'
import { Link, Navigate } from 'react-router-dom'
import axios from 'axios'

class Login extends React.Component {

    state = {
          password: '',
          email: ''
      }
    
      handleChange = ({ target }) => {
        const { name, value } = target
        this.setState({ [name]: value })
      }
    
    
      submit = async (e) => {
        e.preventDefault();

        axios
            .post("http://localhost:5000/api/users/login",{
                password: this.state.password,
                email: this.state.email
            })
            .then((res) =>{
                const { token } = res.data
                localStorage.setItem("token", token)
                window.location = "/"
            })
            .catch((error) => {
                alert("Błędny login lub hasło")
              })
      }
    
      resetUserInputs = () => {
        this.setState({
          password: '',
          email: ''
        });
      };

    render() {
        return(
    <>
    <div className='container-xl align-items-center text-center'>
    <h1>Witamy ponownie</h1>
        <form onSubmit={this.submit}>

        <div className="form-group text-center">
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

        <button>Zaloguj</button>
        </form>
    </div>
    <div className='container-xl align-items-center text-center'>
        <h1>Nie masz jeszcze konta?</h1>
        <Link to="/register">
            <button className='btn-lg' type='button'>
                Zarejestruj się
            </button>
        </Link>
    </div>
    </>
        )
    }
}

export default Login