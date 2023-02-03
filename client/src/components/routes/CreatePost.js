import { useState } from "react"


function CreatePost ({user,  topics, updatePostsArray, updateTopicsArray }) {


const [selectedTopic, setSelectedTopic] = useState(null)
const [selectedTopicsArray, setSelectedtopicsArray] = useState([])
const [selectedTopicsDisplay, setSelectedTopicsDisplay] = useState([])
const [postTitle, setPostTile] = useState("")
const [postBody, setPostBody] = useState("")
const [newTopic, setNewTopic] = useState("")




// ------ Create a New Post ----------
function handleTopicSelect(e){
    setSelectedTopic(e.target.value)
}

function handleAddTopic(e){
   const selectedTopicsElement=document.getElementById("selected_topics")
   console.log(selectedTopicsElement.innerText)
    // prevent default because it is inside a form
    e.preventDefault()

    setSelectedTopic(e.target.value)
    // for the below function allow append child to add to the element so the topics names' accumulate
    if (selectedTopicsArray.includes(selectedTopic) === false){
        setSelectedtopicsArray([...selectedTopicsArray, e.target.value]);
        setSelectedTopicsDisplay([...selectedTopicsDisplay, topics[e.target.value-1].name])
    }
    else console.log("there")
}

function handleSetPostTitle(e){
    setPostTile(e.target.value)
}

function handleSetPostBody(e){
    setPostBody(e.target.value)
}

function handleSetNewTopic(e){
    setNewTopic(e.target.value)
}

// POST a post to the db and update the post array
function handleSubmit(e){
    e.preventDefault()
    fetch("/posts",{
        method: "POST",
        headers: {
            "Content-Type":"application/json",
        },
        body: JSON.stringify({
            user_id: user.id,
            title: postTitle,
            body: postBody,
            topic_id: selectedTopicsArray
        })
    })
    .then((r)=>r.json())
    .then((data)=>updatePostsArray(data))
}

// POST a topic to the db and update the topics array
function handleCreateTopic(){
    console.log("create topic triggered")
    fetch("/topics",{
        method: "POST",
        headers: {
            "Content-Type":"application/json",
        },
        body: JSON.stringify({
            name: newTopic
        })
    })
    .then(r=>r.json())
    .then(topic=>updateTopicsArray(topic))
}

    return(
        <div>
        <h2>Create Post</h2>
        <form id="post-form" onSubmit={handleSubmit}>
           Title: <input type='text' onChange={handleSetPostTitle}/>
           <br/>
           Topic: 
           <select onChange={handleTopicSelect}> 
                <option value={null}>select a topic</option>
            {topics.map((topic)=>{
                return(
                    <option value={topic.id}>{topic.name}</option>
                )
            })}
           </select>
           <button onClick={handleAddTopic} value={selectedTopic}>add topic</button>
           <br/>
            Post Text: 
            <br/>
            <textarea type="text" onChange={handleSetPostBody}/>
        </form>
        <button type="submit" form="post-form" value="Submit">Submit</button>
        <h4 id="selected_topics">Selected Topics: </h4>
        <p>{
           selectedTopicsDisplay.map((topic)=>{
            const p=document.createElement('p')
            return(
                p.innerText=`${topic}: `
                )
           })
        }
        </p>
            <h2>Create Topic</h2>
            <input type="text" onChange={handleSetNewTopic}></input>
            <button onClick={handleCreateTopic}>add topic</button>
        </div>
    )
}

export default CreatePost