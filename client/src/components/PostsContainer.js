import { useState } from "react";
import { useEffect } from "react";
import Nav from "./Nav.js";
import CreatePost from "./routes/CreatePost.js";
import PublicPosts from "./routes/PublicPosts.js";
import UserPosts from "./routes/UserPosts.js";

import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";

 

function PostsContainer ({user, publicPosts, updatePostsArray, updatePostsOnUpdate, deletePost}) {

  const [topics, setTopics] = useState([])

  useEffect(()=>{
    fetch("/topics")
    .then((r)=>r.json())
    .then((data)=>{setTopics(data);
    }
    );
},[])

// add a topic
function updateTopicsArray(topic){
  setTopics([...topics, topic])
}

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Nav />, 
      children: [
          {
            path: "/CreatePosts",
            element: <CreatePost 
            user={user} 
            topics={topics} 
            updatePostsArray={updatePostsArray}
            updateTopicsArray={updateTopicsArray}
            />,
          },
          {
            path: "/PublicPosts",
            element: <PublicPosts publicPosts={publicPosts} />,
          },
          {
            path: "/UserPosts",
            element: <UserPosts user={user} topics={topics} updatePostsOnUpdate={updatePostsOnUpdate} deletePost={deletePost}/>
          }
      ] 
},

  ]);

    return (
        <div>
            <RouterProvider router={router} />
        </div>
    )
}

export default PostsContainer