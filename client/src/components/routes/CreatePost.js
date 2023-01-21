import { useEffect, useState } from "react"


function CreatePost ({user,  updatePostsArray }) {

const [topics, setTopics] = useState([])
const [selectedTopic, setSelectedTopic] = useState(1)
const [postTitle, setPostTile] = useState("")
const [postBody, setPostBody] = useState("")


// ------ Create a New Post ----------
function handleTopicSelect(e){
    setSelectedTopic(e.target.value)
}

function handleSetPostTitle(e){
    setPostTile(e.target.value)
}

function handleSetPostBody(e){
    setPostBody(e.target.value)
}

function handleSubmit(e){
    e.preventDefault()
console.log("handle submit triggered")

fetch("/posts",{
    method: "POST",
    headers: {
        "Content-Type":"application/json",
    },
    body: JSON.stringify({
        user_id: user.id,
        title: postTitle,
        body: postBody,
        topic_id: selectedTopic,
    })
})
.then((r)=>r.json())
.then((data)=>updatePostsArray(data))
}

useEffect(()=>{
    fetch("/topics")
    .then((r)=>r.json())
    .then((data)=>{setTopics(data);
        setSelectedTopic(data[0].name)
    }
    );
},[])

    return(
        <div>
        <h2>Create Post</h2>
        <form id="post-form" onSubmit={handleSubmit}>
           Title: <input type='text' onChange={handleSetPostTitle}/>
           <br/>
           Topic: 
           <select onChange={handleTopicSelect}> 
            {topics.map((topic)=>{
                return(
                    <option value={topic.id}>{topic.name}</option>
                )
            })}
           </select>
           <br/>
            Post Text: 
            <br/>
            <textarea type="text" onChange={handleSetPostBody}/>
        </form>
        <button type="submit" form="post-form" value="Submit">Submit</button>
        </div>
    )
}

export default CreatePost