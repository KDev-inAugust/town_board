class Post < ApplicationRecord
    validates :title, presence: true
    validates :body, presence: true
    belongs_to :user
    has_many :post_topics, dependent: :destroy, autosave: true
    has_many :topics, through: :post_topics
end
