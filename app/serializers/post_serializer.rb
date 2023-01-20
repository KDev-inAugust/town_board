class PostSerializer < ActiveModel::Serializer
  attributes :id, :title, :user_id, :body
 
  has_many :topics
  
end
