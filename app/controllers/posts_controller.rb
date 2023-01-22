class PostsController < ApplicationController
    
    def index
        posts=Post.all
        render json: posts
    end

    def create 
        post=Post.create(post_params)
        
        params[:topic_id].map { |id| post.post_topics.create(topic_id: id)}
        render json: post
    end
   
    private

    def post_params
        params.permit(:title, :body, :user_id)
    end

end
