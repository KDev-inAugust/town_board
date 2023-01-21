import { useEffect, useState } from "react"


export default function CreatePost () {

const [topics, setTopics] = useState([])
const [selectedTopic, setSelectedTopic] = useState([])
const [postBody, setPostBody] = useState("")

function handleTopicSelect(e){
    console.log(e.target.value)
}

function handleSubmit(e){
    e.preventDefault()
console.log("handle submit triggered")
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
           Title: <input type='text' />
           <br/>
           Topic: 
           <select onChange={handleTopicSelect}> 
            {topics.map((topic)=>{
                return(
                    <option>{topic.name}</option>
                )
            })}
           </select>
           <br/>
            Post Text: 
            <br/>
            <textarea type="text"/>
        </form>
        <button type="submit" form="post-form" value="Submit">Submit</button>
        </div>
    )
}