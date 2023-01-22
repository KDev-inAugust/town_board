import { useEffect, useState } from "react"


function CreatePost ({user,  updatePostsArray }) {

const [topics, setTopics] = useState([])
const [selectedTopic, setSelectedTopic] = useState(null)
const [selectedTopicsArray, setSelectedtopicsArray] = useState([])
const [selectedTopicsDisplay, setSelectedTopicsDisplay] = useState("")
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
    // prevvent default because it is inside a form
    e.preventDefault()
    // console.log(selectedTopicsArray.includes(selectedTopic))
    setSelectedTopic(e.target.value)
    selectedTopicsArray.includes(selectedTopic) === false ? 
    setSelectedtopicsArray([...selectedTopicsArray, e.target.value]) : console.log("there"); 
    
    // for the below function allow append child to add to the element so the topics names' accumulate
  setSelectedTopicsDisplay(topics[e.target.value-1].name)

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



// console.log(topics[0].name)

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
           <button onClick={handleAddTopic} value={selectedTopic}>add topic</button>
           <br/>
            Post Text: 
            <br/>
            <textarea type="text" onChange={handleSetPostBody}/>
        </form>
        <button type="submit" form="post-form" value="Submit">Submit</button>
        <h4>Selected Topics: </h4>
        <p>{
           selectedTopicsDisplay
        }
        </p>
        </div>
    )
}

export default CreatePost