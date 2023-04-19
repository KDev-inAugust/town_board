


function PublicPosts ({publicPosts}) {
    return (

        <div>
            <h1 className="post-header">Public Posts</h1>
            <div>{
                publicPosts.map((post)=>{
                    return(
                        <div className="post" key={post.id}>
                            <h3>{post.title}</h3>
                            <p>{post.body}</p>
                            <p>{post.topics.map((topic)=>{
                            return(<li key={topic.id}>{topic.name}</li>)
                            }
                            )}</p>
                        </div>
                    )
                })
                }</div>
        </div>
    )
}

export default PublicPosts