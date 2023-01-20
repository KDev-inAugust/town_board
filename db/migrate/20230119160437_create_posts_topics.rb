class CreatePostsTopics < ActiveRecord::Migration[7.0]
  def change
    create_table :post_topics do |t|
      t.integer :topic_id
      t.integer :post_id
      t.timestamps
    end
  end
end


