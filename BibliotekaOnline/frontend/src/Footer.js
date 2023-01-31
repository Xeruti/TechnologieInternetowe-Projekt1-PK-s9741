import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import Events from './Events.json'


class Footer extends React.Component {

  render() {
    let today = new Date().getTime();

    return(
      <footer className='bg-light container-flex justify-content-center'>
        <div className='row p-0 m-0'>
        <div className='lead p-2 col-12 text-center' >
      {Events.Events.map((event, index)=>{
        if(today > new Date(event.dateStart).getTime() && today < new Date(event.dateEnd).getTime()){
        return(  
        <p className='lead p-2 ' key={index}><Link className="link-info" to="/">{event.title}</Link>- {event.description} </p>
        )
        }
      })}
      </div>
      <p className='lead p-2 col-12 text-center'>Kontakt: 123-987-456 Email: bibliotekaonlie@gmail.com</p>
      </div>
      </footer>
    );
  }
}


export default Footer;