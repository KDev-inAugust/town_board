import Nav from "./Nav.js";
import PublicPosts from "./routes/PublicPosts.js";
import UserPosts from "./routes/UserPosts.js";

import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";

  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Nav />, 
      children: [
        {
            path: "/PublicPosts",
            element: <PublicPosts />,
          },
          {
            path: "/UserPosts",
            element: <UserPosts />
          }
      ] 
},

  ]);

export default function PostsContainer () {
    return (
        <div>
            <p>this is the posts container</p>
            <RouterProvider router={router} />
        </div>
    )
}