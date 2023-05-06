class TopicsController < ApplicationController
    before_action :authorize
    def index
        topics = Topic.all
        render json: topics
    end

    def create
        topic=Topic.create(topic_params)
        if topic.valid?
        render json: topic
        else
        render json: { error: "make sure this topic has a name to add it" }, status: :unprocessable_entity
        end
    end

    private

    def topic_params
        params.permit(:name)
    end
end
