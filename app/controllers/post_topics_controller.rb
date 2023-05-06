class PostTopicsController < ApplicationController
    before_action :authorize

    def index
        pt=PostTopic.all
        render json: pt
    end

    def destroy
        params[:topic_array].map { |topicID| post_topic=PostTopic.where(post_id: params[:post_id], topic_id: topicID);
            pt=PostTopic.find_by(id: post_topic[0].id);
            pt.destroy }
    end

    def create
        post_topic=PostTopic.create(post_topic_params)
        render json: post_topic
    end

    def add_to_post
        joinArray=params[:topic_array].map { |topicID| PostTopic.create(post_id: params[:post_id], topic_id: topicID)
        }
        render json: joinArray
    end

    private  
    def post_topic_params 
        params.permit(:topic_id, :post_id)
    end
    
end
