import { createElement, useEffect, useState } from "react"


function CreatePost ({user,  updatePostsArray }) {

const [topics, setTopics] = useState([])
const [selectedTopic, setSelectedTopic] = useState(null)
const [selectedTopicsArray, setSelectedtopicsArray] = useState([])
const [selectedTopicsDisplay, setSelectedTopicsDisplay] = useState([])
const [postTitle, setPostTile] = useState("")
const [postBody, setPostBody] = useState("")


useEffect(()=>{
    fetch("/topics")
    .then((r)=>r.json())
    .then((data)=>{setTopics(data);
    }
    );
},[])

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
    // selectedTopicsArray.includes(selectedTopic) === false ? 
    // setSelectedtopicsArray([...selectedTopicsArray, e.target.value]) : console.log("there"); 
    
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
        topic_id: selectedTopicsArray
    })
})
.then((r)=>r.json())
.then((data)=>updatePostsArray(data))
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
        </div>
    )
}

export default CreatePost