import { useEffect } from "react";
import { useState } from "react";
import LogIn from "./LogIn";
import SignUp from "./SignUp";
import PostsContainer from "./PostsContainer";
import '../App.css';

function App() {

const [user, setUser] = useState(null);
const [error, setError] =  useState([]);
const [publicPosts, setPublicPosts]=useState([])



useEffect(()=>{
  fetch("/me")
  .then((r)=> {
    if (r.ok) {
      r.json().then((user) => setUser(user));
    }
  })
},[])

useEffect(()=>{
    fetch("/posts")
    .then((r)=>r.json())
    .then((publicPosts)=>setPublicPosts(publicPosts))
},[])


function updatePostsArray(newpost){

  setPublicPosts([...publicPosts, newpost])
}

// this "/me" checks the user against an active sessions user_id so if there is no active sesssion it will throw an error
function handleLogin(){
  fetch("/me")
  .then((r)=> {
    if (r.ok) {
      r.json().then((user) => setUser(user))
    }
    else
    r.json().then((data) => setError(data.error))

  })
}

function handleLogout(){
  fetch("/logout", {
    method: "DELETE",
  }).then(()=> setUser(null))
}


console.log(user)

if (user!==null){
  return (
    <div>
      <h2>Welcome, {user.user_name}</h2>
      <button onClick={handleLogout}>Logout</button>
      <PostsContainer user={user} publicPosts={publicPosts} updatePostsArray={updatePostsArray}/>
    </div>
  )
  }
  else return (
    <div className="App">
      <header className="App-header">
        <h1>Town Board</h1>
        <h2>Log In</h2>
        <LogIn onLogin={handleLogin}/>
        <p>{error}</p>
        <h2>Sign Up</h2>
       <SignUp onLogin={handleLogin}/>
      </header>
    </div>
  );
}

export default App;
