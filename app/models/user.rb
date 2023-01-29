class User < ApplicationRecord
    validates :user_name, presence: true
    has_secure_password
    has_many :posts, -> { order(id: :asc) }
    has_many :topics, through: :posts
end
 