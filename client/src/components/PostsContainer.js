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

 

function PostsContainer ({user, publicPosts, updatePostsArray, updatePostsOnUpdate}) {

  const [topics, setTopics] = useState([])

  useEffect(()=>{
    fetch("/topics")
    .then((r)=>r.json())
    .then((data)=>{setTopics(data);
    }
    );
},[])


  const router = createBrowserRouter([
    {
      path: "/",
      element: <Nav />, 
      children: [
          {
            path: "/CreatePosts",
            element: <CreatePost user={user} topics={topics} updatePostsArray={updatePostsArray}/>,
          },
          {
            path: "/PublicPosts",
            element: <PublicPosts publicPosts={publicPosts} />,
          },
          {
            path: "/UserPosts",
            element: <UserPosts user={user} topics={topics} updatePostsOnUpdate={updatePostsOnUpdate}/>
          }
      ] 
},

  ]);

    return (
        <div>
            <p>this is the posts container</p>
            <RouterProvider router={router} />
        </div>
    )
}

export default PostsContainer