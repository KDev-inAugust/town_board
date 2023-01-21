class PostsController < ApplicationController
    
    def index
        posts=Post.all
        render json: posts
    end

    def create 
        post=Post.create(post_params)
        post_topic=post.post_topics.create(topic_id: params[:topic_id])
        render json: post
    end

    private

    def post_params
        params.permit(:title, :body, :user_id)
    end

end
