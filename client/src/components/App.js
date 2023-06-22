import { useEffect } from "react";
import { useState } from "react";
import LogIn from "./LogIn";
import SignUp from "./SignUp";
import PostsContainer from "./PostsContainer";
import '../App.css';

function App() {

const [user, setUser] = useState(null);
const [error, setError] =  useState([]);
const [publicPosts, setPublicPosts] = useState([])


useEffect(()=>{
  fetch("/api/me")
  .then((r)=> {
    if (r.ok) {
      r.json().then((user) => setUser(user));
    }
  })
},[publicPosts])

useEffect(()=>{
    fetch("/api/posts")
    .then((r)=>r.json())
    .then((publicPosts)=>setPublicPosts(publicPosts))
},[])

// this function updates the posts upon creation of a new post
function updatePostsArray(newpost){
  setPublicPosts([...publicPosts, newpost])
}
// this function updates the post upon the updating of a current post
function updatePostsOnUpdate(updatedPost){
  let newPostsArray = publicPosts.map((post)=>{
    if (post.id===updatedPost.id) {
      return updatedPost
    }
    else return post
  })
  setPublicPosts(newPostsArray.sort((a, b)=> a.id - b.id))
  }


// delete a post
function deletePost(id){
  let filteredArray=publicPosts.filter((post)=>{
    return post.id!==id;});

  fetch(`/api/posts/${id}`, {
    method: "DELETE",
  }).then((r)=>{if(r.ok){setPublicPosts(filteredArray)
  }})
}

// this "/me" checks the user against an active sessions user_id so if there is no active sesssion it will throw an error
function handleLogin(){
  fetch("/api/me")
  .then((r)=> {
    if (r.ok) {
      r.json().then((user) => {setUser(user);
      
      fetch("/api/posts")
    .then((r)=>r.json())
    .then((publicPosts)=>setPublicPosts(publicPosts))
      }
      );
      
    }
    else
    r.json().then((data) => setError(data.error))
    })
}

function handleLogout(){
  fetch("/api/logout", {
    method: "DELETE",
  }).then(()=> setUser(null))
}


if (user!==null){
  
console.log(publicPosts)
  
  return (
    <div className="App">
      <header className="App-header">
        <h2>Welcome, {user.user_name}</h2>
        <button onClick={handleLogout}>
          Logout
          </button>
      </header>
      
      <PostsContainer 
      user={user} 
      publicPosts={publicPosts} 
      updatePostsArray={updatePostsArray} 
      updatePostsOnUpdate={updatePostsOnUpdate}
      deletePost={deletePost}/>
      
    </div>
  )
  }
  else return (
    <div className="App">
      <header id="login-header">
        <h1>Town Board</h1>
      </header>
      <h2>Log In</h2>
      <LogIn onLogin={handleLogin}/>
      <p>{error}</p>
      <h2>Sign Up</h2>
      <SignUp onLogin={handleLogin}/>
    </div>
  );
}

export default App;
