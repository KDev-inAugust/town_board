import { Link, Outlet } from "react-router-dom";
export default function Nav(){

    return (
        <div>
             <h1>Navigation</h1>
             <button>
             <Link to={`/`}>home</Link>
             </button>

             <button>
             <Link to={`PublicPosts`}>route one  </Link>
             </button>
             
             <button>
             <Link to={`UserPosts`}>route three  </Link>
             </button>
            
            
             <div>
                <Outlet />
             </div>
        </div>
       
    )
}