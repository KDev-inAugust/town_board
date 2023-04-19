class PostsController < ApplicationController
    before_action :authorize, only: [:create, :destroy]

    def index
        posts=Post.all
        render json: posts.order(id: :asc)
    end

    def create 
            post=Post.create(post_params)
            if post.valid?
            params[:topic_array].map { |topic| post.post_topics.create(topic_id: topic[:id])}
            render json: post, status: :created
            else
                render json: { errors: post.errors.full_messages }, status: :unprocessable_entity
            end



    end

    def destroy
        post=Post.find_by(id: params[:id])
        post.destroy
        render json: post
    end

    def updatechain
        # the post topic destroy sequence

        # params[:destroy_topic_array].map { |topicID| post_topic=PostTopic.where(post_id: params[:post_id], topic_id: topicID);
        #     pt=PostTopic.find_by(id: post_topic[0].id);
        #     pt.destroy }


        
 params[:destroy_topic_array].map { |topic|
    post_topic=PostTopic.where(post_id: params[:post_id], topic_id: topic[:id]);
            pt=PostTopic.find_by(id: post_topic[0].id);
            pt.destroy }


        # the create topic sequence
        # joinArray=params[:add_topic_array].map { |topicID| PostTopic.create(post_id: params[:post_id], topic_id: topicID)
        # }


        joinArray=params[:add_topic_array].map { |topic| PostTopic.create(post_id: params[:post_id], topic_id: topic[:id])
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

    def authorize
        return render json: { error: "Not authorized" }, status: :unauthorized unless session.include? :user_id
    end

    # test methods

   def time_posts
    user=User.find_by(id: params[:id])
    post=user.posts.where("title LIKE ?", "%Time%")
    render json: post
   end



end
