import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from "react";
import Axios from "axios";
// import axios from 'axios';

function App() {

  const [lists, setlists] = useState([])
  const [value, setvalue] = useState("")

  useEffect(() => {
    Axios.get('/api')
    .then(response=> {console.log(response.data)})

    Axios.get('/api/getvalues')
    .then(response => {
      console.log(response)
      setlists(response.data)
    })
    
  }, [])

  const onvalue =(e)=>{
    setvalue(e.currentTarget.value)
  }
  const onsubmithandle =(e)=> {
    e.preventDefault();
    Axios.post('/api/values',{value:value})
    .then(response=>{
      if(response.data.success){
        console.log(response.data)
        setlists([...lists,response.data])
        setvalue("")
      }else{
        alert("err")
      }
    })
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        
        <div className="container">
          {lists && lists.map((list,i)=>(
            <li key={i}>{list.value}</li>
          ))}

          <form className="example" onSubmit={onsubmithandle}>
            <input
              type="text"
              placeholder="입력해주세요..."
              onChange={onvalue}
              value={value}
            />
            <button type="submit">확d인</button>
          </form>
        </div>


      </header>
    </div>
  );
}

export default App;
