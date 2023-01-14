import { useEffect } from "react";
import { useState } from "react";
import '../App.css';

function App() {

const [users, setUsers] = useState([])

useEffect(()=>{

  fetch("/users")
  .then((r)=>r.json())
  .then((users)=>setUsers(users))
},[])

  return (
    <div className="App">
      <header className="App-header">
        <h1>Town Board</h1>
        <p>
        Users
        {users.map((user)=>{
          return(
            <p>{user.user_name}</p>
          )
        })}
        </p>
      </header>
    </div>
  );
}

export default App;
