class PostTopicSerializer < ActiveModel::Serializer
  attributes :id, :post_id, :topic_id
end
