export default function UserPosts ({user}) {
    // this user prop is coming all the way down from the App component
    return (
        <div>
            <h1>User Posts</h1>
            <p>{
                user.posts.map((post)=>{
                    return(
                        <div>
                        <h2>{post.title}</h2>
                        <p>{post.body}</p>
                        <h3>topics</h3>
                        <p>{post.topics.map((topic)=>{
                            return(
                                
                                <p>{topic.name}</p>
                            )
                            
                        })
                        
                        }</p>
                        <button>edit post</button>
                        </div>
                    )
                })
                }</p>
        </div>
    )
}