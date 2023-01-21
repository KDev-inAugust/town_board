class PostTopicsController < ApplicationController


    def index
        pt=PostTopic.all
        render json: pt
    end

    def create
        post_topic=PostTopic.create(post_topic_params)
        render json: post_topic
    end

    private  
    def post_topic_params 
        params.permit(:topic_id, :post_id)
    end
    
end