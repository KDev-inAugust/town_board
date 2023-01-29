import { useState } from "react"

export default function UserPosts ({user, topics, updatePostsOnUpdate}) {
    // the user and updatePostsOnUpdate props are coming all the way down from the App component

    const [showEdit, setShowEdit] = useState(false)
    const [postTitle, setPostTile] = useState("")
    const [postBody, setPostBody] = useState("")

    function handleSetPostTitle(e){
        setPostTile(e.target.value)
    }
    
    function handleSetPostBody(e){
        setPostBody(e.target.value)
    }

    function handleShowEdit(){
        setShowEdit(!showEdit)
        console.log(showEdit)
    }

    function commitChanges(e){
        e.preventDefault()
        let id = e.target.value
        fetch(`/posts/${id}`,{
            method: "PATCH",
            headers: {
                "Content-Type":"application/json",
            },
            body: JSON.stringify({
                title: postTitle,
                body: postBody
            })
        })
        .then((r)=>r.json())
        .then((post)=>updatePostsOnUpdate(post))
        setShowEdit(!showEdit)
    }


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
                                return(<p>{topic.name}</p>)
                                })
                            }</p>
                            {showEdit===false? 
                            <div>
                                <button onClick={handleShowEdit}>edit post</button>
                            </div> 
                                : 
                            <div>
                                <form id="post-update" value={post.id}>
                                    <input type="text" onChange={handleSetPostTitle}></input>
                                    <br/>
                                    <textarea type="text" onChange={handleSetPostBody}></textarea>
                                    <br/>
                                    <select>
                                    {topics.map((topic)=>{
                                        return(
                                        <option value={topic.id}>{topic.name}</option>
                                        )
                                        })}
                                    </select>
                                </form>
                                <button type="submit" form="post-update" value={post.id} onClick={commitChanges}>save edit</button>
                                <button onClick={handleShowEdit}>cancel changes</button>
                            </div>
                            }
                        </div>
                    )
                })
                }</p>
        </div>
    )
}