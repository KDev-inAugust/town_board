
import Nav from "./Nav.js";
import CreatePost from "./routes/CreatePost.js";
import PublicPosts from "./routes/PublicPosts.js";
import UserPosts from "./routes/UserPosts.js";

import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";

  



export default function PostsContainer ({user, publicPosts}) {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Nav />, 
      children: [
          {
            path: "/CreatePosts",
            element: <CreatePost />,
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