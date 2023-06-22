import { useState } from "react"

function UserPost ({post, topics, updatePostsOnUpdate, deletePost}) {
   
    const [showEdit, setShowEdit] = useState(false)
    const [postTitle, setPostTitle] = useState(post.title)
    const [postBody, setPostBody] = useState(post.body)
    const [addRemoveButton, setAddRemoveButton] = useState(null)
    const [selectedTopicIndex, setSelectedTopicIndex] = useState(null)
    const [removeTopicCue, setRemoveTopicCue] = useState([])
    const [addTopicCue, setAddTopicCue] = useState([])

    // the functions below set needed state for the post update
    function handleSetPostTitle(e){
        setPostTitle(e.target.value)
    }
    
    function handleSetPostBody(e){
        setPostBody(e.target.value)
    }

// this function checks whether or not the selected topic is assiated with post and 
// provides an 'add' or 'remove' option based on the response. 

    function addRemoveQuery(e){
        e.preventDefault()
        console.log("add remove query sets the topic arr index as", e.target.value, 
        "should reflect topic named: ", topics[e.target.value]
        )
        setSelectedTopicIndex(parseInt(e.target.value))
        // post topics includes selected? (target value is topic id)
        let topicIdarr=[];
        post.topics.map(topic=>topicIdarr.push(topic.id))
        topicIdarr.includes(topics[e.target.value].id)===true? setAddRemoveButton(false) : setAddRemoveButton(true)
    }


// this function sets state to show the edit fields
    function handleShowEdit(){
        setPostTitle(post.title)
        setPostBody(post.body)
        setShowEdit(!showEdit)
        setRemoveTopicCue([])
        setAddTopicCue([])
    }


// cue topics for removal
function removeCue(e){
    e.preventDefault();
    console.log(selectedTopicIndex,  "   VS  ", topics[selectedTopicIndex].id);

    console.log("remove topic cue", removeTopicCue);

    removeTopicCue.includes(topics[selectedTopicIndex].id)===false?
    setRemoveTopicCue([...removeTopicCue, topics[selectedTopicIndex]]) : console.log("already in the cue");
}

// cue topics for addition
function addCue(e){
    e.preventDefault()
    console.log(selectedTopicIndex,  "   VS  ", topics[selectedTopicIndex].id);

    console.log("ADD topic cue", addTopicCue);

    addTopicCue.includes(topics[selectedTopicIndex].id)===false?
    setAddTopicCue([...addTopicCue, topics[selectedTopicIndex]]) : console.log("already in the cue")
}

// ---------- this function commits changes to the post in sequence
function commitChanges (e){
    e.preventDefault()
console.log("commit changes triggered")
updateSequence()
}


// ----the update sequence

function updateSequence(){

console.log(`add cue ${addTopicCue} - - remove cue ${removeTopicCue}`)

    fetch('/api/updatechain',{
        method: "PATCH",
        headers: {
        "Content-Type":"application/json",
                    },
            body: JSON.stringify({
            id: post.id,
            title: postTitle,
            body: postBody,
            post_id: post.id,
            destroy_topic_array: removeTopicCue,
            add_topic_array: addTopicCue,
            })
            })
    .then((r)=>r.json())
    .then((data)=>{
        console.log(data);
        updatePostsOnUpdate(data);
    
    })
    setShowEdit(false)
    }
    

    function handleDelete(e){
        e.preventDefault()
        deletePost(post.id);
        setShowEdit(false);
    }

    function preventEnterKey (e){
        if (e.keyCode===13) {
            e.preventDefault()
        }
    }

    return (
        <div className="post">
            <h2>{post.title}</h2>
            <p>{post.body}</p>
            <br></br>
            <h3>topics:</h3>
            <h4>{post.topics.map((topic)=>{
                return(<p key={topic.id}>{topic.name}</p>)
                })
            }</h4>
            {/* This is where the EDIT FIELD code begins */}
            {showEdit===false? 
        <div>
            <button onClick={handleShowEdit}>edit post</button>
        </div> 
            : 
        <div>
            <form id="post-update" value={post.id} >
                <input type="text" value={postTitle} onChange={handleSetPostTitle} onKeyDown={preventEnterKey}></input>
                <br/>
                <textarea type="text" value={postBody} onChange={handleSetPostBody}></textarea>
                <br/>
                <select onChange={addRemoveQuery}>
                    <option value={null}>select a topic</option>
                    {topics.map((topic, index)=>{
                        return(
                        <option key ={topic.id} value={index}>{topic.name}</option>
                        )
                        })}
                </select>

                { addRemoveButton===false? <button onClick={removeCue}>remove topic from post</button> : <button onClick={addCue}>add topic to post</button> }

                { removeTopicCue.map((index)=>{

                    const p=document.createElement('p');
                    return(
                    p.innerText=`remove: ${index.name}, `
                    )})
                }
                <br></br>
                { addTopicCue.map((index)=>{
                    const p=document.createElement('p');
                    return(
                    p.innerText=`add: ${index.name}, `
                    )})
                }

            </form>
            <button type="submit" form="post-update" value={post.id} onClick={commitChanges}>save edit</button>
            <button onClick={handleShowEdit}>cancel changes</button>
            <br/>
            <button onClick={handleDelete}>Delete Post</button>
        </div>
        }
    </div>
    )
}












export default UserPost