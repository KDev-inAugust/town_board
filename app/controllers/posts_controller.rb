class PostsController < ApplicationController
    
    def index
        posts=Post.all
        render json: posts.order(id: :asc)
    end


    def create 
        post=Post.create(post_params)
        if post.valid?
        params[:topic_id].map { |id| post.post_topics.create(topic_id: id)}
        render json: post, status: :created
        else
            render json: { error: "Make sure your post has at least a title and body to get started" }, status: :unprocessable_entity
        end
    end

    # def update
    #     post=Post.find_by(id: params[:id])
    #     post.update(post_params)
    #     render json: post
    # end

    def destroy
        post=Post.find_by(id: params[:id])
        post.destroy
        render json: post
    end

    def updatechain
        # the post topic destroy sequence
        params[:destroy_topic_array].map { |topicID| post_topic=PostTopic.where(post_id: params[:post_id], topic_id: topicID);
            pt=PostTopic.find_by(id: post_topic[0].id);
            pt.destroy }

        # the create topic sequence
        joinArray=params[:add_topic_array].map { |topicID| PostTopic.create(post_id: params[:post_id], topic_id: topicID)
        }

        # the update posts sequence
            post=Post.find_by(id: params[:id])
            post.update(post_params)

            render json: post
    end
   
    private

    def post_params
        params.permit(:title, :body, :user_id)
    end

end
