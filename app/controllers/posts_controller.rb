class PostsController < ApplicationController
    
    def index
        posts=Post.all
        render json: posts.order(id: :asc)
    end


    def create 
        post=Post.create(post_params)
        params[:topic_id].map { |id| post.post_topics.create(topic_id: id)}
        render json: post
    end

    def update
        post=Post.find_by(id: params[:id])
        post.update(post_params)
        render json: post
    end
   
    private

    def post_params
        params.permit(:title, :body, :user_id)
    end

end
