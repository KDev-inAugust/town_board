import { useEffect } from "react";
import { useState } from "react";
import LogIn from "./LogIn";
import SignUp from "./SignUp";
import '../App.css';

function App() {

const [user, setUser] = useState(null);

useEffect(()=>{

  fetch("/me")
  .then((r)=> {
    if (r.ok) {
      r.json().then((user) => setUser(user));
    }
  })
},[])

function handleLogout(){
  fetch("/logout", {
    method: "DELETE",
  }).then(()=> console.log("Logged Out"))
}


if (user){
  return (
    <div>
      <h2>Welcome, {user.user_name}</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
  }
  else return (
    <div className="App">
      <header className="App-header">
        <h1>Town Board</h1>
        <h2>Log In</h2>
        <LogIn onLogin={setUser}/>
        <h2>Sign Up</h2>
       <SignUp onLogin={setUser}/>
      </header>
    </div>
  );

  
}

export default App;
