Rails.application.routes.draw do
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
    # test routes
  get "users/:id/time_posts", to: "posts#time_posts"
end
