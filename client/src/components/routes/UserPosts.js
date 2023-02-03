import UserPost from "../UserPost"

export default function UserPosts ({user, topics, updatePostsOnUpdate, deletePost}) {
    // the user and updatePostsOnUpdate props are coming all the way down from the App component


    return (
        <div>
            <h1>User Posts</h1>
            <div>{
                user.posts.map((post)=>{ 
                    return(
                       <UserPost post={post} topics={topics} updatePostsOnUpdate={updatePostsOnUpdate} deletePost={deletePost}/>
                    )
                })
                }
                </div>
        </div>
    )
}

