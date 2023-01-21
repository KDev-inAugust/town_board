class UserSerializer < ActiveModel::Serializer
  attributes :id, :user_name

  has_many :posts
  has_many :topics, through: :posts
end
