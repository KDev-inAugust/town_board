class TopicsController < ApplicationController
    def index
        topics = Topic.all
        render json: topics
    end

    def create
        topic=Topic.create(topic_params)
        render json: topic
    end

    private

    def topic_params
        params.permit(:name)
    end
end
