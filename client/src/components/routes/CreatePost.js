import { useState } from "react"


function CreatePost ({user,  topics, updatePostsArray, updateTopicsArray }) {


const [selectedTopic, setSelectedTopic] = useState(null)
const [selectedTopicsArray, setSelectedtopicsArray] = useState([])
const [selectedTopicsDisplay, setSelectedTopicsDisplay] = useState([])
const [postError, setNewPostError] = useState([])
const [postTitle, setPostTile] = useState("")
const [postBody, setPostBody] = useState("")
const [newTopic, setNewTopic] = useState("")




// ------ Create a New Post ----------
function handleTopicSelect(e){
    setSelectedTopic(e.target.value)
}

function handleAddTopic(e){
    // prevent default because it is inside a form
    e.preventDefault()

    setSelectedTopic(e.target.value)
    
    if (selectedTopicsArray.includes(selectedTopic) === false){
        setSelectedtopicsArray([...selectedTopicsArray, e.target.value]);
        setSelectedTopicsDisplay([...selectedTopicsDisplay, topics[e.target.value-1].name])
    }
    else console.log("there")
}

// these functions handle setting post data to state
function handleSetPostTitle(e){
    setPostTile(e.target.value)
}

function handleSetPostBody(e){
    setPostBody(e.target.value)
}

function handleSetNewTopic(e){
    setNewTopic(e.target.value)
}

// User feedback on successful post
function confirmSubmitToUser(){
    let userFeedbackElement=document.getElementById("user-feedback-container");
    let p=document.createElement('p');
    p.id="user-feedback";
    userFeedbackElement.appendChild(p).innerText=`"${postTitle}" - post successful`;
    setPostBody("")
    setPostTile("")
    setSelectedtopicsArray([])
    setSelectedTopicsDisplay([])
}
// user feedback on successful add topic
function confirmAddTopicToUser(){
    let userFeedbackElement=document.getElementById("user-feedback-container");
    let p=document.createElement('p');
    p.id="user-feedback";
    userFeedbackElement.appendChild(p).innerText=`"${newTopic}" - post successful`;
    setNewTopic("");
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
    .then((r)=>{
       if (r.ok) {
        r.json().then((data)=>updatePostsArray(data))
        .then(confirmSubmitToUser())
       }
       else
       r.json().then((errors) => {
        let newErrors=errors.errors.map((index)=>{
            return (<p key={index}>{index}</p>)
        })
        setNewPostError(newErrors);
        })
    })
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
    .then((r)=>{
        if (r.ok){
            r.json()
            .then(topic=>updateTopicsArray(topic))
            .then(confirmAddTopicToUser)
        }
        else r.json().then((error)=>{
            setNewPostError(error.error)
        })
    })
}

    return(
        <div>
        <h1 className="post-header">Create Post</h1>
        <p id="user-feedback-container"></p>
        <form id="post-form" onSubmit={handleSubmit}>
           Title: <input type='text' onChange={handleSetPostTitle} value={postTitle}/>
           <br/>
           Topic: 
           <select onChange={handleTopicSelect}> 
                <option value={null}>select a topic</option>
            {topics.map((topic)=>{
                return(
                    <option key={topic.id} value={topic.id}>{topic.name}</option>
                )
            })}
           </select>
           <button onClick={handleAddTopic} value={selectedTopic}>add topic</button>
           <br/>
            Post Text: 
            <br/>
            <textarea type="text" onChange={handleSetPostBody} value={postBody}/>
        </form>
        <button type="submit" form="post-form" value="Submit">Submit</button>
        <h4 id="selected_topics">Selected Topics: </h4>
        <p className="selected-topics">{
           selectedTopicsDisplay.map((topic)=>{
            const p=document.createElement('p')
            return(
                p.innerText=`${topic}: `
                )
           })
        }
        </p>
            <h2>Create Topic</h2>
            <input type="text" onChange={handleSetNewTopic} value={newTopic}></input>
            <button onClick={handleCreateTopic}>add topic</button>
            <p>{postError}</p>
        </div>
    )
}

export default CreatePost