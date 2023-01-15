import { useEffect } from "react";
import { useState } from "react";
import SignUp from "./SignUp";
import '../App.css';

function App() {

const [usersArray, setUsersArray] = useState([])
const [user, setUser] = useState(null);

useEffect(()=>{

  fetch("/users")
  .then((r)=>r.json())
  .then((usersArray)=>setUsersArray(usersArray))
},[]);



  return (
    <div className="App">
      <header className="App-header">
        <h1>Town Board</h1>
       <SignUp onLogin={setUser}/>
        <h2>
        Users
        {usersArray.map((user)=>{
          return(
            <p>{user.user_name}</p>
          )
        })}
        </h2>
      </header>
    </div>
  );
}

export default App;
