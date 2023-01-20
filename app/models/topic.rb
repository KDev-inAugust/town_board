class Topic < ApplicationRecord
   has_many :post_topics
   has_many :posts, through: :post_topics

end
