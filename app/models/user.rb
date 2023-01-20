class User < ApplicationRecord
    validates :user_name, presence: true
    has_secure_password
    has_many :posts
end
