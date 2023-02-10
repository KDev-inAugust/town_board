import { useState } from "react"

function UserPost ({post, topics, updatePostsOnUpdate, deletePost}) {

    console.log(post.id)

    const [showEdit, setShowEdit] = useState(false)
    const [postTitle, setPostTitle] = useState(post.title)
    const [postBody, setPostBody] = useState(post.body)
    const [addRemoveButton, setAddRemoveButton] = useState(null)
    const [selectedTopicId, setSelectedTopicId] = useState(null)
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
        setSelectedTopicId(parseInt(e.target.value))
        // post topics includes selected? (target value is topic id)
        let arr=[];
        post.topics.map(post=>arr.push(post.id))
        arr.includes(parseInt(e.target.value))===true? setAddRemoveButton(false) : setAddRemoveButton(true)
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
    e.preventDefault()
    removeTopicCue.includes(selectedTopicId)===false?
    setRemoveTopicCue([...removeTopicCue,selectedTopicId]) : console.log("already in the cue");
}

// cue topics for addition
function addCue(e){
    e.preventDefault()
    addTopicCue.includes(selectedTopicId)===false?
    setAddTopicCue([...addTopicCue, selectedTopicId]) : console.log("already in the cue")
}

// ---------- this function commits changes to the post in sequence
function commitChanges (e){
    e.preventDefault()
console.log("commit changes triggered")
updateSequence()
}


// ----trying to shift it to the backend

function updateSequence(){

    fetch('/updatechain',{
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
    .then((data)=>{updatePostsOnUpdate(data)})
    setShowEdit(false)
    }
    
//   function updateSequence(){ 
//      fetch(`/post_topics`,{
//             method: "DELETE",
//             headers: {
//                 "Content-Type":"application/json",
//             },
//             body: JSON.stringify({
//                 post_id: post.id,
//                 topic_array: removeTopicCue
//             })
//         }).then((res)=>{ if (res.ok) {
//             fetch('/add_to_post',{
//                 method: "POST",
//                 headers: {
//                     "Content-Type":"application/json",
//                 },
//                 body: JSON.stringify({
//                     post_id: post.id,
//                     topic_array: addTopicCue
//                 })
//             }).then((res)=>{
//                 if (res.ok){
//                     fetch(`/posts/${post.id}`,{
//                         method: "PATCH",
//                         headers: {
//                             "Content-Type":"application/json",
//                         },
//                         body: JSON.stringify({
//                             title: postTitle,
//                             body: postBody
//                         })
//                     })
//                     .then((r)=>r.json())
//                     .then((data)=>{updatePostsOnUpdate(data)})
//                     setShowEdit(false)
//                 }
//             })
//         } })}

// add topics to the current post while editing

    function handleDelete(e){
        e.preventDefault()
        setPostTitle(post.title)
        setPostBody(post.body)
        deletePost(post.id);
        setShowEdit(false);
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
                <input type="text" value={postTitle} onChange={handleSetPostTitle}></input>
                <br/>
                <textarea type="text" value={postBody} onChange={handleSetPostBody}></textarea>
                <br/>
                <select onChange={addRemoveQuery}>
                    <option value={null}>select a topic</option>
                    {topics.map((topic)=>{
                        return(
                        <option value={topic.id}>{topic.name}</option>
                        )
                        })}
                    </select>
                { addRemoveButton===false? <button onClick={removeCue}>remove topic from post</button> : <button onClick={addCue}>add topic to post</button> }

                { removeTopicCue.map((topicID)=>{
                    const p=document.createElement('p');
                    return(
                    p.innerText=`remove: ${topics[topicID-1].name}, `
                    )})
                }
                { addTopicCue.map((topicID)=>{
                    const p=document.createElement('p');
                    return(
                    p.innerText=`add: ${topics[topicID-1].name}, `
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