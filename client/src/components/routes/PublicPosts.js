


function PublicPosts ({publicPosts}) {
    
    console.log(publicPosts)
    return (

        <div>
            <h1>Public Posts</h1>
            <p>{
                publicPosts.map((post)=>{
                    return(
                        <div>
                        <h3>{post.title}</h3>
                        <p>{post.body}</p>
                        <p>{post.topics.map((topic)=>{
                            return(<li>{topic.name}</li>)
                        }
                        )}</p>
                        </div>
                    )
                })
                }</p>
        </div>
    )
}

export default PublicPosts