import Nav from "./Nav.js";
import PublicPosts from "./routes/PublicPosts.js";
import UserPosts from "./routes/UserPosts.js";

import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";

  


export default function PostsContainer ({user}) {
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