import { useEffect } from "react"
import { useState } from "react"

export default function PublicPosts () {
    
    const [publicPosts, setPublicPosts]=useState([])

    useEffect(()=>{
        fetch("/posts")
        .then((r)=>r.json())
        .then((posts)=>setPublicPosts(posts))
    },[])

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