import { useState } from "react"

function UserPost ({post, topics, updatePostsOnUpdate}) {


    const [showEdit, setShowEdit] = useState(false)
    const [postTitle, setPostTile] = useState(post.title)
    const [postBody, setPostBody] = useState(post.body)
    const [addRemoveButton, setAddRemoveButton] = useState(null)
    const [selectedTopicId, setSelectedTopicId] = useState(null)
    const [removeTopicCue, setRemoveTopicCue] = useState([])

    // the functions below set needed state for the post update
    function handleSetPostTitle(e){
        setPostTile(e.target.value)
    }
    
    function handleSetPostBody(e){
        setPostBody(e.target.value)
    }

// this function checks whether or not the selected topic is assiated with post and 
// provides an 'add' or 'remove' option based on the response. 

    function addRemoveQuery(e){
        e.preventDefault()
        setSelectedTopicId(parseInt(e.target.value))
        // post topics includes selected? (target value is topic id)
        let arr=[];
        post.topics.map(post=>arr.push(post.id))
        arr.includes(parseInt(e.target.value))===true? setAddRemoveButton(false) : setAddRemoveButton(true)
    }

// this function sets state to show the edit fields
    function handleShowEdit(){
        setShowEdit(!showEdit)
        setRemoveTopicCue([])
    }
// this function commits changes to the post 
    function commitChanges(e){
        removeTopic(e)
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

// cue topics for removal
function removeCue(e){
    e.preventDefault()
    removeTopicCue.includes(selectedTopicId)===false?
    setRemoveTopicCue([...removeTopicCue,selectedTopicId]) : console.log("already in the cue");
}

// add or remove topics from the current post while editing
    function removeTopic (e){
        e.preventDefault();
        fetch(`/post_topics`,{
            method: "DELETE",
            headers: {
                "Content-Type":"application/json",
            },
            body: JSON.stringify({
                post_id: post.id,
                topic_array: removeTopicCue
            })
        })
    }

    function addTopic (e){
        e.preventDefault();
        console.log("add topic");
    }

    return (
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
                <select onChange={addRemoveQuery}>
                    <option value={null}>select a topic</option>
                    {topics.map((topic)=>{
                        return(
                        <option value={topic.id}>{topic.name}</option>
                        )
                        })}
                    </select>
                { addRemoveButton===false? <button onClick={removeCue}>remove topic from post</button> : <button onClick={addTopic}>add topic to post</button> }

                { removeTopicCue.map((topicID)=>{
                    const p=document.createElement('p');
                    return(
                    p.innerText=`${topics[topicID-1].name}, `
                    )})
                }

            </form>
            <button type="submit" form="post-update" value={post.id} onClick={commitChanges}>save edit</button>
            <button onClick={handleShowEdit}>cancel changes</button>
        </div>
        }
    </div>
    )
}












export default UserPost