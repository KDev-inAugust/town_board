export default function UserPosts ({user}) {
    // this user prop is coming all the way down from the App component
    return (
        <div>
            <h1>User Posts</h1>
            <p>{
                user.posts.map((post)=>{
                    return(
                        <div>
                        <li>{post.title}</li><p>{post.body}</p>
                        <button>edit post</button>
                        </div>
                    )
                })
                }</p>
        </div>
    )
}