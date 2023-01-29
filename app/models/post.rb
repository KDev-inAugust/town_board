class Post < ApplicationRecord
    belongs_to :user
    has_many :post_topics, dependent: :destroy, autosave: true
    has_many :topics, through: :post_topics
end
