class Api::UsersController < ApplicationController
    before_action :authorize
    
    def index
        users=User.all
        render json: users, include: ['posts.topics']
    end

    def show
        user=User.find_by(id: session[:user_id])
        if user 
            render json: user, include: ['posts.topics'] 
        else
            render json: { error: "That Username and Password combination is not recognized" }, status: :unauthorized
        end
    end

    def create 
        user = User.create(user_params)
        if user.valid?
        session[:user_id]=user.id
        render json: user, status: :created
        else 
            render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
        end
    end

    private

    def user_params
        params.permit(:user_name, :password, :password_confirmation)
    end
end
