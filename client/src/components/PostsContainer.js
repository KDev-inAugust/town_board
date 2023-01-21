
import Nav from "./Nav.js";
import CreatePost from "./routes/CreatePost.js";
import PublicPosts from "./routes/PublicPosts.js";
import UserPosts from "./routes/UserPosts.js";

import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";

  

function PostsContainer ({user, publicPosts, updatePostsArray}) {


  const router = createBrowserRouter([
    {
      path: "/",
      element: <Nav />, 
      children: [
          {
            path: "/CreatePosts",
            element: <CreatePost user={user} updatePostsArray={updatePostsArray}/>,
          },
          {
            path: "/PublicPosts",
            element: <PublicPosts publicPosts={publicPosts} />,
          },
          {
            path: "/UserPosts",
            element: <UserPosts user={user}/>
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