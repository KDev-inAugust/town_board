import { Link, Outlet } from "react-router-dom";
export default function Nav(){

   

    return (
        <div>
             <h1>Navigation</h1>
             <button>
             <Link to={`CreatePosts`}>Create Post</Link>
             </button>

             <button>
             <Link to={`PublicPosts`}>Public Posts  </Link>
             </button>
             
             <button>
             <Link to={`UserPosts`}>User Posts  </Link>
             </button>
            
            
             <div>
                <Outlet />
             </div>
        </div>
       
    )
}