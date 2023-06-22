Rails.application.routes.draw do

  namespace :api do
    resources :post_topics
    resources :topics
    resources :posts 
    resources :users
    # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

    # Defines the root path route ("/")
    root "users#index"

    post "/signup", to: "users#create"
    post "/login", to: "sessions#create"
    get "/me", to: "users#show"
    delete "/logout", to: "sessions#destroy"
    delete "/post_topics", to: "post_topics#destroy"
    post "/add_to_post", to: "post_topics#add_to_post"
    patch "/updatechain", to: "posts#updatechain"
  end 

  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }

end
