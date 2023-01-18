class PostSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :body
  belongs_to :user
end
